/*
 * Сервер приложения для поиска по организациям в Яндекс
 * Запускается отдельно от приложения из дирректории ./server
 * коммандой `yarn up`
 *
 * Работает на http://localhost:3011
 */

// Подключаемые модули
const request = require('request');
const fs = require('fs');
const http = require('http');
const process = require('process');
require('dotenv').config();

// Функция для использования глобальных переменных в областях с ограничением видимости
function Server() {}

const port = 3011;
// Создание http сервера с обработчиком
const server = http.createServer((req, res) => {
	const need =  decodeURI(req.url.replace('/?search=', ''));
	const apiKey = process.env.YANDEX_MAP_API;
	// Запрос на API Яндекса
	request.get(encodeURI(`https://search-maps.yandex.ru/v1/?text=${need}&type=biz&lang=ru_RU&apikey=${apiKey}`), function(error, response, body) {
		if (error) {
			console.log(error);
		}
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type', 'application/json');
		const data = JSON.parse(body);
		Server.result = [];
		// Подготовка данных для отправки приложению
		if (data.features) {
			data.features.map(item => {
				Server.result.push({
					id: item.properties.id,
					name: item.properties.name,
					description: item.properties.description,
					url: item.properties.url,
					Categories: item.properties.CompanyMetaData.Categories,
					Phones: item.properties.CompanyMetaData.Phones,
					Hours: item.properties.CompanyMetaData.Hours,
					Features: item.properties.CompanyMetaData.Features,
					Links: item.properties.CompanyMetaData.Links,
					geometry: item.geometry
				});
			});
			// Отправка готовых данных
			res.end(JSON.stringify({
				need: need,
				items: Server.result
			}));
		}
		else {
			// Отправка приложению пустых данных
			res.end(JSON.stringify({
				need: need,
				items: []
			}));
		}
	})
});

// Запуск сервера
server.listen(port, () => console.log(`Server listen at http://localhost:${port}`));

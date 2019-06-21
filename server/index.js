const request = require('request');
const fs = require('fs');
const http = require('http');
const process = require('process');
require('dotenv').config();

function Server() {}
const port = 3011;
const server = http.createServer((req, res) => {
	const need =  decodeURI(req.url.replace('/?search=', ''));
	const apiKey = process.env.YANDEX_MAP_API;
	request.get(encodeURI(`https://search-maps.yandex.ru/v1/?text=${need}&type=biz&lang=ru_RU&apikey=${apiKey}`), function(error, response, body) {
		if (error) {
			console.log(error);
		}
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type', 'application/json');
		const dataString = fs.readFileSync('barash.json').toString();
		const data = JSON.parse(body);
		Server.result = [];
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
			res.end(JSON.stringify({
				need: need,
				items: Server.result
			}));
		}
		else {
			res.end(JSON.stringify({
				need: need,
				items: []
			}));
		}
	})
});
server.listen(port, () => console.log(`Server listen at http://localhost:${port}`));

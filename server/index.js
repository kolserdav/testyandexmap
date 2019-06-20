const request = require('request');
const fs = require('fs');
const http = require('http');

function Server() {}
const port = 3011;
const server = http.createServer((req, res) => {
	const need = req.url.replace('/?search=', '');
	/*const apiKey = '71fb0822-215b-40f3-9230-7ae7be8909a4';
	request.get(encodeURI(`https://search-maps.yandex.ru/v1/?text=${need}&type=biz&lang=ru_RU&apikey=${apiKey}`), function(error, response, body) {
		if (error) {
			console.log(error);
		}
		fs.writeFileSync('barash.json', JSON.stringify(body));
	})*/
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');
	const dataString = fs.readFileSync('barash.json').toString();
	const data = JSON.parse(JSON.parse(dataString)); 
	Server.result = [];
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
});
server.listen(port, () => console.log(`Server listen at http://localhost:${port}`));

var request = require('request')
var json2csv = require('json2csv')
var fs = require('fs')

var mapping = []	// [{'road_name': <road_name>, 'jam_factor': <jam_factor>}]

//var expired = 'ugPaFndPmgFxofY9ZnWL&app_code=QOowHetHZAyiD3lVbFkEVw'
var url = 'https://traffic.ls.hereapi.com/traffic/6.2/flow.json?bbox=37.787617, -122.399255;37.786319, -122.393139&apiKey=ILy1ZN0OVw9aj4sSem9HdLLnOGAfIp0CZ79cAuVhdIM'


request(url, function (error, response, body) {
	if (!error && response && response.statusCode == 200) {
		var data = JSON.parse(body)
		var ts = Math.round((new Date()).getTime() / 1000);
		fs.writeFile('today/traffic_data_'+ts+'.json', body, (err) => {
    		if (err) throw err;
    		console.log('Data written to file');
		});
	}
})



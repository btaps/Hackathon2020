var json2csv = require('json2csv')
var fs = require('fs')

var path = "./today/"
var files = fs.readdirSync(path)
var mapping = []	// [{'road_name': <road_name>, 'jam_factor': <jam_factor>}]


files.forEach(function(file) {
	var map_data = require(path+file)
	processData(map_data, file)

} );

writeToFile();

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function getIndex(arr1, arr2, pc, qd) {
    var indexes = [], i = -1;
		indexes = getAllIndexes(arr1,pc);
		var iii=-1;
		if(indexes.length != 0) {
			indexes.forEach(function(ii) {

				if(arr2[ii] === qd ) {
					iii=ii;
				}
			});
		}
		return iii;
}

function processData(data, file) {
	// console.log(data)
	var road_list = data['RWS'][0]['RW']
	var hmap = new Map();

	road_list.forEach(function(roads) {
		//console.log(roads)
		roads['FIS'][0]['FI'].forEach(function(road) {
			//console.log(road)
/*
Street names matches with their pccodes
Howard, Folsom, 1, 2, 3

*/
			var pccodes = [10611,10610,10723,10722, 10567, 51929, 10566, 51928]
//			var pccodes = [1, 10610, 10611, 51929,1,1,10722,51928]
			//Some roads are merged and hence number of positive not equal to negative
			var dir = ['+','+','-','-','+','+','+','-']

			var index = getIndex(pccodes, dir, road['TMC']['PC'], road['TMC']['QD']);
			if(index!=-1) {
				hmap.set(index, road['CF'][0]['JF']);
			//var obj = {'road_name': road['TMC']['DE'], 'jam_factor': road['CF'][0]['JF']}
			//mapping.push(obj)
		}
		})
});

var tmp1 = file.split(".");
var tmp = tmp1[0].split("data_");
var filename = tmp[1];

var clock = timestamp(filename);
var obj = {'Time':clock,'A':hmap.get(0),'B':hmap.get(1),'C':hmap.get(2),'D':hmap.get(3),'E':hmap.get(4),'F':hmap.get(5),'G':hmap.get(6),'H':hmap.get(7)}
mapping.push(obj)

}


function writeToFile() {
	var csv = json2csv({ data: mapping, fields: ['Time','A','B','C','D','E','F','G','H'] });

	fs.writeFile('dailytime.csv', csv, function(err) {
		if (err) throw err;
		console.log('file saved dailytime.csv');
});
}


function timestamp(ud) {

var	date = new Date(parseInt(ud) * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return formattedTime;
}

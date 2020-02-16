import json
def make_records(intensity, lights):
	record = {"road":{}, "light":{}}
	for ind,val in enumerate(intensity):
		record["road"][ind] = val
	for ind,val in enumerate(lights):
		record["light"][ind] = val
	return record

intensity = [0,1.63697,1.80591,3.89404,0,0,2.22217,1.91139 ] 

lights = [0,1,0,1]


with open('records.txt', 'w') as json_file:
	for i in range(1):
		record = make_records(intensity, lights)
		json.dump(record, json_file)

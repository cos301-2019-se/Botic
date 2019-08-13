from flask import Flask, request, json, jsonify
import re
import fasttext
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

import os

@app.route('/',methods=['GET','POST'])
@cross_origin()
def test():
	if request.method == 'POST' or request.method == 'GET':
		trainNetwork("dataset/dataset.txt", "__label__", "scrubModel")
		response = jsonify('Model has been trained :)')
		response.status_code = 202
		return response
	response = jsonify('Model training failed')
	response.status_code = 400
	return response

@app.route('/scrub', methods=['GET', 'POST'])
def scrub():
	if request.method == 'POST' or request.method == 'GET':
		input_data = request.form.get('data', '-999')
		if input_data == '-999':
			response = jsonify('')
			response.status_code = 400
			return response
		response = check(input_data)
		findData(input_data, "scrubModel", "__label__")
		if response != '[]':
			response = formatReturn(response)
		response = jsonify(response)
		response.headers.add('Access-Control-Allow-Origin', '*')
		response.status_code = 202
		# response.headers.add('Access-Control-Allow-Origin', '*')
		return response

#@return: a string containing word indexes(as if the string was an array) which reveal private info 
# followed by a ':' and then the severity of the PI with 3 as cant send and 1 as ok but weird o.O
def check(input_data):	#Reads json file of predefined triggers and checks input against them, to be replaced with word2vec/Neural Network
	with open('flags.txt', 'r') as file:
		data_raw = file.read()
	data = json.loads(data_raw)
	result = []
	severity_index = []

	input_data = input_data.lower()
	for x in data["identifiers"]:
		severity_count = 0
		for y in data["privacy_type"]:
			check_for = y + x
			check_for = check_for.lower()
			if check_for in input_data:
				temp = wordIndex(input_data, input_data.index(check_for) + len(check_for))
				if temp not in result:
					severity_index.append(data["severity_index"][severity_count])
					result.append(temp)				
			severity_count += 1
	
	result = repr(result)
	severity_count = 0
	i = 0
	if len(severity_index) != 0:
		while i < len(result):
			if result[i] == ',' or result[i] == ']':
				result = result[0: i] + ":" + str(severity_index[severity_count]) + result[i:]
				severity_count += 1
				i += 2
			i += 1
	return result

def wordIndex(input_data, char_index):
	input_data += ' '
	count = char_index + 1
	personal_info = ''
	while True:
		if input_data[count] == ' ':
			count = 0
			words = input_data.split(' ')
			for x in words:
				if personal_info != x:
					count += 1
				else:
					return count
		else:
			personal_info += input_data[count]
			count += 1

def formatReturn(data):
	jsonObj = "["
	temp = data[1:-1].replace(" ", "").split(',')
	for x in temp:
		y = x.split(':')
		jsonObj += "{\'position\':" + y[0] + ","
		jsonObj += "\'severity\':" + y[1] + "},"
	jsonObj = jsonObj[0:-1] + "]"
	return jsonObj

def trainNetwork(fileName, label, model):
	#texts = ['Hi, my name is bob and my password is 19283918293 and my username is BobRox123']
	classifier = fasttext.supervised(fileName, model, label_prefix=label)
	classifier = fasttext.load_model(model + '.bin', label_prefix=label)
	#print(labels)

def findData(text, model, label):
	print("Loading model...")
	lists = []
	lists.append(text)
	classifier = fasttext.load_model(model + '.bin', label_prefix=label)
	labels = classifier.predict_proba(lists, k=len(classifier.labels))
	for k in labels:
		for label in k:
			if not(label[1] < 0.03126):
				print(label)
	#print(labels)

if __name__ == '__main__':
	app.run(host='0.0.0.0')
	app.run()

from flask import Flask, request, json, jsonify
import re

app = Flask(__name__)

import os
# port = int(os.environ.get("PORT", 5000))
# app.run(host='0.0.0.0', port=port)

# @app.route('/')
# def test():
#	return 'Welcome to the Message Scrubber API!'

@app.route('/scrub', methods=['GET', 'POST'])
def scrub():
	if request.method == 'POST' or request.method == 'GET':
		input_data = request.form.get('data', '-999')
		if input_data == '-999':
			response = jsonify('')
			response.status_code = 400
			return response
		response = check(input_data)
		response = jsonify(response)
		response.status_code = 202
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

if __name__ == '__main__':
	app.run(host='0.0.0.0')
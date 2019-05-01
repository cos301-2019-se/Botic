from flask import Flask, request, json
import re
app = Flask(__name__)

@app.route('/scrub', methods=['GET', 'POST'])
def scrub():
	data = []
	if request.method == 'POST' or request.method == 'GET':
		input_data = request.form.get('data')
		response = check(input_data)
		return response

#@return: a string containing word indexes(as if the string was an array) which reveal private info
def check(input_data):	#Reads json file of predefined triggers and checks input against them, to be replaced with word2vec/Neural Network
	with open('flags.txt', 'r') as file:
		data_raw = file.read()
	data = json.loads(data_raw)
	result = set()

	input_data = input_data.lower()
	for x in data["identifiers"]:
		for y in data["privacy_type"]:
			check_for = y + x
			check_for = check_for.lower()
			if check_for in input_data:
				result.add(wordIndex(input_data, input_data.index(check_for) + len(check_for)))
	
	result = repr(sorted(result))
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
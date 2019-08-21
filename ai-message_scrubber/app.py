#Standard
from flask import Flask, request, json, jsonify
from flask_cors import CORS, cross_origin
import re
import os

#Text scraper stuff
import gensim
from dateutil.parser import parse

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def isReservedWord(word):
	return {
		'NAME' : True,
		'EMAIL' : True,
		'ID' : True,
		'PASSWORD' : True,
		'USERNAME' : True,
		'BIRTHDAY' : True,
		'PASSWORD' : True,
	}.get(word, False);

def is_date(string, fuzzy=False):
    try:
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False

def arrayFromFile(filename):
    text_file = open(filename, "r")
    lines = text_file.read().split('\n')
    text_file.close()
    return lines

def inDictionary(dictionary, searchWord):
	for word in dictionary:
		if word.upper() == searchWord.upper():
			return True
	return False

def search(text,target,n):
	'''Searches for text, and retrieves n words either side of the text, which are retuned seperatly'''
	print("\ttext: " + text)
	print("\tTarget: " + target)
	array = text.split(' ')
	print("\tword is " + str(array.index(target)) + " in " + str(len(array)-1))

	word = r"\W*([\w]+)"

	#determine the edges of the word
	position = array.index(target)
	numWords = len(array)-1

	left = n;
	right = n;


	if (position - n < 0):
		left = position


	if (position + n > numWords):
		right = numWords - position

	groups = re.search(r'{}\W*{}{}'.format(word*left,target,word*right), text)

	if left == 0:
		groups = re.search(r'{}\W*{}{}'.format(word*left,target,word*right), text)

	if groups:
		groups = groups.groups()
		if right == 0:
			return groups[:left]

		if left == 0:
			return groups[:right]

		return groups[:left],groups[right:]
	else:
		return False

def listit(t):
	return list(map(listit, t)) if isinstance(t, (list, tuple)) else t

def flatten(lst):
	new_lst = []
	flatten_helper(lst, new_lst)
	return new_lst

def flatten_helper(lst, new_lst):
	for element in lst:
		if isinstance(element, list):
			flatten_helper(element, new_lst)
		else:
			new_lst.append(element)

def context(sentence, word):
	ctext = search(sentence, word, 3)
	return flatten(listit(ctext))

def reservedWordSeverity(word):
    word = word.upper()
    if (word == "NAME") or (word == "NAME'S"):
        return 0
    else:
        if (word == "EMAIL"):
            return 0
        else:
            if (word == "ID"):
                return 0
            else:
                if (word == "PASSWORD"):
                    return 2
                else:
                    if (word == "USERNAME"):
                        return 1
                    else:
                        return -1

def getSeverity(word):
    word = word.upper()
    return {
		'NAME' : 1,
		'EMAIL' : 2,
		'ID' : 2,
		'PASSWORD' : 3,
		'USERNAME' : 1,
		'BIRTHDAY' : 1,
    }.get(word, -1)

def addEntry(position, severity):
    return "{ 'position': " + str(position) +", 'severity': " + str(severity) + "}"

def investigate(sentence, word, position):
	context_list = context(sentence, word)
	possibleOutputs = model.predict_output_word(context_list, topn=5)
	print("\t" + str(possibleOutputs))

	if isReservedWord(possibleOutputs[0][0].upper()):
		severity = getSeverity(possibleOutputs[0][0])
		entry = addEntry(position, severity)
		print("\n\tWord might be: " + str(possibleOutputs[0]))
		return entry
	else:
		return ""

def parseInfo(info):
	changed = "["
	infoArray = info.split(' ')
	first = True

	for word in infoArray:
		if isReservedWord(word.upper()):
			severityIndex = reservedWordSeverity(word.upper())
			if first == True:
				changed += addEntry(infoArray.index(word), (severityIndex))
				first = False
			else:
				changed += "," + addEntry(infoArray.index(word), (severityIndex))


		#Third, check for names
		#TODO: Change this to work with NLTK
		#for y in infoArray:
		#    for name in names:
		#        if word_in(y, name):
		#            changed += addEntry(str(infoArray.index(y)), '0')

		#Forth, check for important date
		if not(len(word) > 10):
			if is_date(word):
				if first == True:
					changed += addEntry(str(infoArray.index(word)), '0')
					first = False
				else:
					changed += "," + addEntry(str(infoArray.index(word)), '0')
		if is_date(word):
			if first == True:
				changed += addEntry(str(infoArray.index(word)), '0')
				first = False
			else:
				changed += "," + addEntry(str(infoArray.index(word)), '0')

		#Fifth, check for words you haven't seen before
		if inDictionary(dictionary, word) == False:
			check_word = investigate(info, word, infoArray.index(word));


			if (first == True) and (check_word != ""):
				changed += check_word
				first = False
			else:
				if (check_word != ""):
					changed += "," + check_word

	changed += "]"
	return changed

#initialise the model and the dictionary
dictionary = arrayFromFile("dictionaries/20k.txt")
model = gensim.models.Word2Vec.load("models/model.word2vec");

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

		response = parseInfo(input_data)

		response = jsonify(response)
		response.headers.add('Access-Control-Allow-Origin', '*')
		response.status_code = 202
		# response.headers.add('Access-Control-Allow-Origin', '*')
		return response


if __name__ == '__main__':
	app.run(port=5001)
	app.run()

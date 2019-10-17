#Standard
from flask import Flask, request, json, jsonify
from flask_cors import CORS, cross_origin
import re
import os
import string

#Text scraper stuff
import gensim
from dateutil.parser import parse

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def arrayFromFile(filename):
    text_file = open(filename, "r")
    lines = text_file.read().split('\n')
    text_file.close()
    return lines


#initialise the model and the dictionary
dictionary = arrayFromFile("dictionaries/20k.txt")
model = gensim.models.Word2Vec.load("models/model.word2vec");


def isReservedWord(word):
	word = word.upper()
	word = word.replace("\n", "")
	return {
		'NAME' : True,
		'EMAIL' : True,
		'ID' : True,
		'PASSWORD' : True,
		'USERNAME' : True,
		'BIRTHDAY' : True,
		'PASSWORD' : True,
		'XXNAMEXX' : True,
		'XXLASTNAMEXX' : True,
		'XXIDNUMBERXX' : True,
		'XXFIRSTNAMEXX' : True,
		'XXEMAILADDRESSXX' : True,		
		'XXPASSWORDXX' : True,
		'XXUSERNAMEXX' : True,
		'XXBIRTHDATEXX' : True,
		'XXADDRESSXX' : True
	}.get(word, False);

def is_date(string, fuzzy=False):
    try:
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False


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
    word = word.replace("\n", "")
    if (word == "NAME") or (word == "NAME'S"):
        return 0
    else:
        if (word == "EMAIL"):
            return 0
        else:
            if (word == "ID") or (word == "ADDRESS"):
                return 0
            else:
                if (word == "PASSWORD"):
                    return 1
                else:
                    if (word == "USERNAME"):
                        return 1
                    else:
                        return -1

def getSeverity(word):
    word = word.upper()
    word = word.replace("\n", "")
    return {
		'NAME' : 1,
		'EMAIL' : 2,
		'ID' : 2,
		'PASSWORD' : 3,
		'USERNAME' : 1,
		'BIRTHDAY' : 1,
		'XXLASTNAMEXX' : 1,
		'XXIDNUMBERXX' : 2,
		'XXFIRSTNAMEXX' : 1,
		'XXEMAILADDRESSXX' : 2,		
		'XXPASSWORDXX' : 3,
		'XXUSERNAMEXX' : 1,
		'XXBIRTHDATEXX' : 1,
		'XXADDRESSXX' : 2
    }.get(word, -1)

def addEntry(position, severity):
    return "{ 'position': " + str(position) +", 'severity': " + str(severity) + "}"

def investigate(sentence, word, position):
	context_list = context(sentence, word)
	possibleOutputs = model.predict_output_word(context_list, topn=5)
	print("\t" + str(possibleOutputs))
	
	if (isReservedWord(possibleOutputs[0][0].upper())):
		severity = getSeverity(possibleOutputs[0][0])
		entry = addEntry(position, severity)
		print("\n\tWord might be: " + str(possibleOutputs[0]))
		return entry
	else:
		return ""

def canDate(word):
	if word.isdigit():
		if (len(word) > 10):
			return False
		else:
			return True
	else:
		return True

def validID(id_number):
	if not (id_number.isdigit()):
		return False

	if (len(id_number) != 13):
		return False

	id_month = int(id_number[2:4])
	id_day = int(id_number[4:6])
	id_citizen = int(id_number[10:11])

	if((id_month) > 12 or (id_month) < 1):
		return False
	elif((id_month) == 1 and ((id_day) > 31 or (id_day) < 1)):
		return False
	elif((id_month) == 2 and ((id_day) > 29 or (id_day) < 1)):
		return False
	elif((id_month) == 3 and ((id_day) > 31 or (id_day) < 1)):
		return False
	elif((id_month) == 4 and ((id_day) > 30 or (id_day) < 1)):
		return False
	elif((id_month) == 5 and ((id_day) > 31 or (id_day) < 1)):
		return False
	elif((id_month) == 6 and ((id_day) > 30 or (id_day) < 1)):
		return False
	elif((id_month) == 7 and ((id_day) > 31 or (id_day) < 1)):
		return False
	elif((id_month) == 8 and ((id_day) > 31 or (id_day) < 1)):
		return False
	elif((id_month) == 9 and ((id_day) > 30 or (id_day) < 1)):
		return False
	elif((id_month) == 10 and ((id_day) > 31 or (id_day) < 1)):
		return False
	elif((id_month) == 11 and ((id_day) > 30 or (id_day) < 1)):
		return False
	elif((id_month) == 12 and ((id_day) > 31 or (id_day) < 1)):
		return False
	elif((id_citizen) < 0 or (id_citizen) > 1):
		return False
	else:
		return True

def couldBeID(word):
	if word.isdigit():
		if (len(word) == 13):
			return True
		else:
			return False

def parseInfo(info):
	changed = "["

	if scanInfo(info):
		print("SAFE!")

		infoArray = info.split(' ')
		first = True

		if(infoArray[0].lower() == "demo") and (len(infoArray) == 2):
			return "[]"

		for word in infoArray:
			word = word.replace("\n", "")

			if len(infoArray) == 1:
				if validID(word):
					if first == True:
						changed += addEntry(str(infoArray.index(word)), '2')
						first = False
					else:
						changed += "," + addEntry(str(infoArray.index(word)), '2')
			else:
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
				if canDate(word):
					if is_date(word):
						if first == True:
							changed += addEntry(str(infoArray.index(word)), '1')
							first = False
						else:
							changed += "," + addEntry(str(infoArray.index(word)), '1')

				#print("TYPE" + str(type(word)))

				if validID(word):
					if first == True:
						changed += addEntry(str(infoArray.index(word)), '2')
						first = False
					else:
						changed += "," + addEntry(str(infoArray.index(word)), '2')

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

def scanInfo(info):
	arrLength = len(info.split(' '));

	if(arrLength == 1) and (validID(info)):
		return True

	unsafeWords = 0

	for word in info.split(' '):
		if not(inDictionary(dictionary, word)):
			unsafeWords += 1

	
	if unsafeWords == 0:
		return True



	ratio = arrLength / unsafeWords; 

	print("num words: " + str(arrLength));
	print("unsafe words: " + str(unsafeWords));
	print("ratio: " + str(ratio))


	if (ratio < 2):
		return False
	else:
		return True


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
		input_data=input_data.translate(str.maketrans({key: None for key in string.punctuation}))
		response = parseInfo(input_data.lower())

		response = jsonify(response)
		response.headers.add('Access-Control-Allow-Origin', '*')
		response.status_code = 202
		# response.headers.add('Access-Control-Allow-Origin', '*')
		return response


# if __name__ == '__main__':
#	app.run(port=5001)
#	app.run()

# rather have something this:
if __name__ == '__main__':
	port = int(os.environ.get("PORT", 5002))
	app.run(host='0.0.0.0', port=port)

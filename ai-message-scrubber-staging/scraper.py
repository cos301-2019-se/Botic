import re

#build a dictionary
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
	print("text: " + text)
	print("Target: " + target)
	array = text.split(' ')
	print("word is " + str(array.index(target)) + " in " + str(len(array)-1))
	
	word = r"\W*([\w]+)"
	
	#determine the edges of the word
	position = array.index(target)
	numWords = len(array)-1
	
	left = n;
	right = n;
	
	
	if (position - n < 0):
		left = position		
		print("beginning of the line, chief.")
	
	if (position + n > numWords):
		right = numWords - position
		print("end of the line chief.")
	
	print("Left: " + str(left) + ", " + "Right: " + str(right))
	
	groups = re.search(r'{}\W*{}{}'.format(word*left,target,word*right), text)
	
	if left == 0:
		groups = re.search(r'{}\W*{}{}'.format(word*left,target,word*right), text)
		
	if groups:
		groups = groups.groups()
		print("found something")
		if right == 0:
			return groups[:left]
		
		if left == 0:
			return groups[:right]
		
		return groups[:left],groups[right:]
	else:	
		return False
    
def context(sentence, word):
	return search(sentence, word, 3)

words = "My name is Borealis, like the lights in the sky."
words1 = "My name is persephone. Like the greek godess."
words2 = "My password is 12321."
words3 = "65678 a crazy dude?"

dictionary = arrayFromFile("dictionaries/20k.txt")

#analyse sentence against a dictionary
def analyse(sentence):
	array = sentence.split(' ')
	print ("\nAnalysing: " + sentence)
	
	for word in array:
		if inDictionary(dictionary, word) == True:
			print("\n"+word + ": " + str(inDictionary(dictionary, word)))
		else:
			print("\n"+word + ": " + str(inDictionary(dictionary, word)) + "\tposition: " + str(array.index(word)))
			if context(sentence, word):	
				print(context(sentence, word))
			else:
				print("Couldn't find shit\n")
	
		print("")

print("WORD 2245: " + dictionary[2245]) 

analyse(words)
#analyse(words1)
#analyse(words2)
#analyse(words3)

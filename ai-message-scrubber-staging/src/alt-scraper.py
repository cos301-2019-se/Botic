#Imports
from dateutil.parser import parse

#Helper
def arrayFromFile(filename):
    text_file = open(filename, "r")
    lines = text_file.read().split('\r\n')
    text_file.close()
    return lines

def word_in(word, phrase):
    return word.upper() in phrase.upper().split()

def is_date(string, fuzzy=False):

    try:
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False

#Globals
reservedWords = [
    "name",
    "name's",
    "email address",
    "ID",
    "password",
    "password's",
    "username"
    ]

#Names Dictionary
names = arrayFromFile('src/names.txt')
#Email Addresses
emails = arrayFromFile('src/emails.txt')
#Dates
dates = arrayFromFile('src/date_of_birth.txt')
#ID numbers
idNumbers = arrayFromFile('src/id_numbers.txt')
#passwords
passwords = arrayFromFile('src/passwords.txt')

#Helper functions

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
                    if (word == "username"):
                        return 1
                    else:
                        return -1

def checkName(string, substring):
    string = string.upper()
    substring = substring.upper()

    #print("string: " + string)
    #print("substring: " + substring)

    return string == substring

def addEntry(position, severity):
    return "{ position: " + position +", severity: " + severity + "},"

def hello():
    print("hello world")

def parseInfo(info):
    changed = "["

    #First, check for reserved words
    for word in reservedWords:
        if info.find(word) != -1:
            infoArray = info.split(' ')
            for y in infoArray:
                if word == y:
                    severityIndex = reservedWordSeverity(y)
                    changed += "{ position: "+ str(infoArray.index(y))+", severity: "+str(severityIndex)+"},"

    #Second, check for words in the Dictionary
    infoArray = info.split(' ')

    #Third, check for names
    for y in infoArray:
        for name in names:
            if word_in(y, name):
                changed += addEntry(str(infoArray.index(y)), '0')

    #Forth, check for important date
    for d in infoArray:
        if is_date(d):
            changed += addEntry(str(infoArray.index(d)), '0')

    changed += "]"
    return changed

#Execution of functions
print(parseInfo("Let us skip the formalties, shall we?"))

print(parseInfo("My wonder is deborah 15/01/1994"))

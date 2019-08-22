from flask import Flask, request, json, jsonify
import re
from flask_cors import CORS, cross_origin
import sys, os
import aiml, string
import nltk
import urllib
import json
from nltk.corpus import stopwords
from collections import Counter
from googlesearch import search

# Not super important but it can be used
# if we need it.
sessionId = 0000

bot = aiml.Kernel()
bot.learn("brain/Greetings.aiml")
bot.learn("brain/Customer.aiml") #This is the business side of the AI
bot.learn("brain/learn.aiml")

# function for machine learning
def readAiml():
   file=open("brain/Greetings.aiml","r")
   lines = file.readlines()
   file.close()
   file=open("brain/Greetings.aiml", "w")
   for line in lines:
      if line!="</aiml>":
         file.write(line)
   file.close()

   file=open("brain/Greetings.aiml","a")
   file.write("<category> \n\n<pattern>"+Upper+" </pattern> \n\n<template>" +Answer+"</template> \n\n</category> \n\n</aiml>")
   file.close()
   upper = tokens(Upper)

   for word in upper:
      if len(word)>3:
         upper1= [ word for word in upper if len(word) >= 3 ]
         for part in upper1:
            DictWrite(part)

# Function to retrieve store
# question for later learning
# and deducing meanings
def read():
   file=open("Smalldata.txt","r")
   check=file.read()
   file.close()
   return check

# Function to store question
# for later learning and deducing
# meanings
def write(messages):
   file=open("Smalldata.txt","a")
   file.write(messages+"\n")
   file.close()
   return

# funcion to tokenize any string
# into parts
def tokens( str ):
   words=nltk.word_tokenize(str)
   return words

# function to find importance of
# words to use them to deduce that
# which thing is being asked more
def Importance():
   filtered_words = [word for word in words if word not in stopwords.words('english')]
   wordfreq = []
   for w in filtered_words:
       wordfreq.append(filtered_words.count(w))
   Frequency= str(zip(filtered_words, wordfreq))
   Free=list(set([Frequency]))
   count = Counter(filtered_words)
   return count

# function to search google if user
# want to get links from google
def SearchGoogle(message):
   UrlCount=0

   for url in search(message, stop=1):
       print(url)
       UrlCount +=1
       if UrlCount == 3:
          break

# function to be used by SameCheck
# function to return keys for
# dictionary that we built for our
# bot to use keywords that are
# stored by last questions to get
# the results.
def hash_map(str):
    related_keys = []

    for tok_word in str:
        if tok_word in dict:
            related_keys.append(dict[tok_word])

    return related_keys

# function to check keywords in
# dictionary and fetch result
# from aiml
def SameCheck(int, key, Dict_search):
   count=0
   keyresponse1 = "Random"

   if debug:
    print("Samecheck(): ")
    print("\t" + str(key))

   for keyword1 in key:
     keywords=tokens(keyword1)
     for keyword in keywords:
        if len(keyword)>2:
           for index in range(0,int):
              if keyword == Dict_search[index]:
                 keyresponse1 = keyword1
                 break
        else:
           keyresponse1 = "Random"

   text = bot.respond(keyresponse1)
   if keyresponse1 != "Random":
       print ("Bot: " + text)

   return text

# function to write the dictionary
# key words into file for later use
def DictWrite(str):
   file = open("Keywords.txt","a")
   file.write(Upper+"\n")
   file.close()

   file = open("Keyword_part.txt","a")
   file.write(str+"\n")
   file.close()

# function to read keywords from files
# and putting them to dictionary with
# information
def DictRead():
   file = open("Keywords.txt","r")
   dictionary = file.readlines()
   dictionary = [line.rstrip('\n') for line in open('Keywords.txt')]
   file.close()

   file = open("Keyword_part.txt","r")
   dictionary1 = file.readlines()
   dictionary1 = [line.rstrip('\n') for line in open('Keyword_part.txt')]
   file.close()

   mydict = {}
   for i,j in zip(dictionary1,dictionary):
      mydict[i] = j
   return mydict

# THE function that the api will call to generate a response.
# Codes:
#   1111 - Normal Message
#   2221 - I have no idea what you are talking about
def respond(message, sessionId):
    output = "{"
    body = bot.respond(message, sessionId)
    if body == "Let me learn this.":
        code = 2222
        output += "'code': " + str(code) + "," + "'message': " + "''"
    else:
        code = 1111
        output += "'code': " + str(code) + "," + "'message': '" + body + "'"

    output += "}"

    return output

# Initialise fflask, which will serve the api
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/prattle', methods=['GET', 'POST'])
def prattle():
    if request.method == 'POST' or request.method == 'GET':
        input_data = request.form.get('data', '-999')
        if input_data == '-999':
            response = jsonify('Holup')
            response.status_code = 400
            return response

        response = jsonify(respond(input_data, sessionId))
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.status_code = 202

    return response

if __name__ == '__main__':
    app.run()

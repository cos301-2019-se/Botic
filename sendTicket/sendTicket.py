from flask import Flask, request, json, jsonify
from flask_cors import CORS, cross_origin

import re
import mysql.connector
import sys, os
import urllib
import json

import psycopg2
from datetime import datetime

def sendQuery(email, subject, body):
	#mydb = mysql.connector.connect(host="sql9.freesqldatabase.com",user="sql9302125",passwd="zriBQtNF5Q",database="sql9302125")

	mydb = psycopg2.connect(
		host="ec2-174-129-10-235.compute-1.amazonaws.com",
		user="cyklqspuqrlzeo",
		password="36b4c5aef1f947c29e90e87595329a51989965369a799d0166f09915f3eb118d",
		database="detua3tvjjqr5k" )

	mycursor = mydb.cursor()

	now = datetime.now()
	formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')

	query = "INSERT INTO ForwardedMessages (Subject, Body, Contact, Status, timein) VALUES ('"+subject+"', '"+body+"','"+email+"', 100, '"+str(formatted_date)+"')"
	print(query)	
	mycursor.execute(query)

	mycursor.execute("SELECT * FROM ForwardedMessages WHERE body='"+body+"'")

	myresult = mycursor.fetchall()
	print ("RESULT: " + str(myresult))
	mydb.commit()
	return myresult


# Initialise fflask, which will serve the api
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/sendTicket', methods=['GET', 'POST'])
def process():
	if request.method == 'POST' or request.method == 'GET':
		input_data = request.form.get('data', '-999')

		email = input_data = request.form.get('email', '-999')
		subject = input_data = request.form.get('subject', '-999')
		body = input_data = request.form.get('body', '-999')

		print("EMAIL: " + email)
		print("SUBJECT: " + subject)
		print("BODY: " + body)

		if input_data == '-999':
			response = jsonify('Holup')
			response.status_code = 400
			return response

		if (sendQuery(email, subject, body) == []):
			response = "{'code' : 'FAIL'}"
		else:
			response = "{'code' : 'SUCCESS'}"
			

        
		response = jsonify(response)
		response.headers.add('Access-Control-Allow-Origin', '*')
		response.status_code = 202

	return response

if __name__ == '__main__':
    app.run(port=5000)

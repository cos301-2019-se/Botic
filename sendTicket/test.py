import mysql.connector
import sys, os
import urllib
import json


#def sendQuery(email, subject, body):
mydb = mysql.connector.connect(
  host="sql9.freesqldatabase.com",
  user="sql9302125",
  passwd="zriBQtNF5Q",
  database="sql9302125"
)

mycursor = mydb.cursor()

#query = "INSERT INTO ForwardedMessages (Subject, Body, Contact, Status) VALUES ('"+subject+"', '"+body+"','"+email+"', 100)"
#success ="null"
#mycursor.execute(query)
mycursor.execute("SELECT * FROM ForwardedMessages WHERE body='I have a freaking problem'")

myresult = mycursor.fetchall()
print("RESULT: " + str(myresult == []))
for x in myresult:
	print("STR: " + str(x))
import mysql.connector
import sys, os
import urllib
import json
import psycopg2

def doQuery( conn ) :
	cur = conn.cursor()
	cur.execute("SELECT * FROM ForwardedMessages")
	
	myresult = cur.fetchall()

	print("RESULT: " + str(myresult == []))
	for x in myresult:
			print("STR: " + str(x))

print("Using psycopg2…")

myConnection = psycopg2.connect(host="ec2-174-129-10-235.compute-1.amazonaws.com",
  user="cyklqspuqrlzeo",
  password="36b4c5aef1f947c29e90e87595329a51989965369a799d0166f09915f3eb118d",
  database="detua3tvjjqr5k" )

doQuery( myConnection )
myConnection.close()


#def sendQuery(email, subject, body):
#mydb = mysql.connector.connect(
#  host="ec2-174-129-10-235.compute-1.amazonaws.com",
#  user="cyklqspuqrlzeo",
#  passwd="36b4c5aef1f947c29e90e87595329a51989965369a799d0166f09915f3eb118d",
#  database="detua3tvjjqr5k"
#)

#mycursor = mydb.cursor()

#query = "INSERT INTO ForwardedMessages (Subject, Body, Contact, Status) VALUES ('"+subject+"', '"+body+"','"+email+"', 100)"
#success ="null"
#mycursor.execute(query)
#
import mysql.connector

mydb = mysql.connector.connect(
  host="sql9.freesqldatabase.com",
  user="sql9302125",
  passwd="zriBQtNF5Q",
  database="sql9302125"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT Body FROM ForwardedMessages")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)
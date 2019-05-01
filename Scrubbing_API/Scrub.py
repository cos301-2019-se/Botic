# To run the program on windows open cmd and use the following commands
# cd Desktop/"301 - Botic"/Botic/Scrubbing_API/venv/Scripts
# activate
# cd ../../
# set FLASK_ENV=development
# set FLASK_APP=Scrub.py

from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def index():
  return 'Server Works!'
  
@app.route('/greet')
def say_hello():
  return 'Hello from Server'
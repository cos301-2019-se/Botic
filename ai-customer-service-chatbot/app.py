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

print('Hello world')

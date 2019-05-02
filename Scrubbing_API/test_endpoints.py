import app

import pytest
import requests
import unittest

from flask import Flask, request, render_template
from flask.testing import FlaskClient


url = 'http://127.0.0.1:5000' # Root URL

def test_index_page():
	r = requests.post(url+'/')
	assert r.status_code == 404

def test_invalid_page():
	r = requests.post(url+'/Invalid_Page')
	assert r.status_code == 404

def test_scrub_page():
	r = requests.post(url+'/scrub')
	assert r.status_code == 400

class FlaskClientTestCase(unittest.TestCase):
	def setUp(self):
		self.app = app.app
		self.app.config['WTF_CSRF_ENABLED'] = False
		self.app.config['SERVER_NAME'] = 'localhost'
		self.client = self.app.test_client()

	def test_no_data_given(self):
		response = self.client.post('/scrub', data = { '': '' } )
		received = response.get_data(as_text=True)
		self.assertTrue("" in received)

	def test_no_personal_info_given(self):
		response = self.client.post('/scrub', data = { 'data': 'This is a test line with no personal information.' } )
		received = response.get_data(as_text=True)
		self.assertTrue("" in received)

	def test_one_personal_info_given(self):
		response = self.client.post('/scrub', data = { 'data': 'This is a test and my password is 1234, oh and i forgot to say my id number is 092130112221' } )
		received = response.get_data(as_text=True)
		self.assertTrue("8:3" in received)
		self.assertTrue("19:2" in received)

	def test_two_personal_info_given(self):
		response = self.client.post('/scrub', data = { 'data': 'This is a test and my email is Garry@ThatPlace.com, my username is test_man_2000. Oh and also you might need my id number: 123456789123456789. Thanks for you help :)' } )
		received = response.get_data(as_text=True)
		self.assertTrue("8:1" in received)
		self.assertTrue("12:1" in received)
		self.assertTrue("22:2" in received)

	def test_three_personal_info_given(self):
		response = self.client.post('/scrub', data = { 'data': 'This is a test and my password is 1234, my mothers maiden name is Margaret, and my username: test_man_3000' } )
		received = response.get_data(as_text=True)
		self.assertTrue("8:3" in received)
		self.assertTrue("14:2" in received)
		self.assertTrue("18:1" in received)
import pytest
import requests
import Scrub
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
    assert r.status_code == 302

class FlaskClientTestCase(unittest.TestCase):
    def setUp(self):
        self.app = Scrub.app
        # self.app_context = self.app.app_context()
        # self.app_context.push()
        self.app.config['WTF_CSRF_ENABLED'] = False
        self.app.config['SERVER_NAME'] = 'localhost'
        self.client = self.app.test_client()

    def test_no_personal_info_given(self):
        response = self.client.post('/scrub', data = { 'data': 'This is a test line with no personal information.' } )
        received = response.get_data(as_text=True)
        self.assertTrue("" in received)

    def test_one_personal_info_given(self):
        response = self.client.post('/scrub', data = { 'data': 'This is a test and my password is 1234' } )
        received = response.get_data(as_text=True)
        self.assertTrue("\"[8:3]\"" in received)

    def test_two_personal_info_given(self):
        response = self.client.post('/scrub', data = { 'data': 'This is a test and my password is 1234, my mothers maiden name is Margaret' } )
        received = response.get_data(as_text=True)
        self.assertTrue("\"[8:3, 14:2]\"" in received)

    def test_three_personal_info_given(self):
        response = self.client.post('/scrub', data = { 'data': 'This is a test and my password is 1234, my mothers maiden name is Margaret, and my username: test_man_3000' } )
        received = response.get_data(as_text=True)
        self.assertTrue("\"[18:1, 8:3, 14:2]\"" in received)

# def test_mock_form_data(self):
#     app = Flask(__name__)
#     client = app.test_client()
#     with app.test_client() as c:
#         rv = c.get('/scrub')
#         assert request.args['data'] == 'This is a test line with no personal information.'
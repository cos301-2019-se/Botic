# Using an official Python runtime as a parent image
FROM python:3.8.0a3-stretch

# Install python and pip
# RUN apk add --no-cache --update python3 py3-pip bash
ADD requirements.txt /tmp/requirements.txt

# Install dependencies
RUN pip3 install --no-cache-dir -q -r /tmp/requirements.txt
# RUN pip install --trusted-host pypi.python.org -r /tmp/requirements.txt

# Add our code
ADD . /opt/webapp/
WORKDIR /opt/webapp

EXPOSE 5000

# Run the image as a non-root user
# RUN adduser -D myuser
# USER myuser

# Run the app. CMD is required to run on Heroku
# $PORT is set by Heroku
CMD gunicorn --bind 0.0.0.0:$PORT wsgi
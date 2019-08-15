# Using an official Python runtime as a parent image
FROM python:3.8.0a3-stretch

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install h5py
RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

# Run the image as a non-root user
# RUN adduser -D myuser
# USER myuser

# Run the app. CMD is required to run on Heroku
# $PORT is set by Heroku
CMD gunicorn --bind 0.0.0.0:$PORT wsgi

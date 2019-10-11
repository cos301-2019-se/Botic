# Using an official Ubuntu runtime for consistency sake as a parent image
FROM ubuntu:18.04

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Setup necessary updates
RUN apt-get update && \
	apt-get -y install sudo
RUN sudo apt -y upgrade

# Install python
RUN sudo apt install -y python3
RUN sudo apt install -y python3-pip

# Install any needed packages specified in requirements.txt
RUN pip3 install h5py
RUN pip3 install Cython
RUN pip3 install --trusted-host pypi.python.org -r requirements.txt
RUN pip3 install nltk
RUN pip3 install google

EXPOSE 5000

# Run the image as a non-root user
# RUN adduser -D myuser
# USER myuser

# Run the app. CMD is required to run on Heroku
# $PORT is set by Heroku
CMD gunicorn --bind 0.0.0.0:$PORT wsgi

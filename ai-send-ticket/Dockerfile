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
RUN sudo apt-get -y install wget

# Install python
RUN sudo apt install -y python3
RUN sudo apt install -y python3-pip

# Add PostgreSQL's repository. It contains the most recent stable release
#     of PostgreSQL, ``9.3``.
#RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" > /etc/apt/sources.list.d/pgdg.list


# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
#RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - 
#RUN sudo apt-get update

# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL 9.3
#  There are some warnings (in red) that show up during the build. You can hide
#  them by prefixing each apt-get statement with DEBIAN_FRONTEND=noninteractive
#RUN apt-get install -y software-properties-common postgresql-11 postgresql-client-11 postgresql-contrib-11

RUN sudo apt-get install -y python-psycopg2
RUN sudo apt-get install -y libpq-dev

#check what I wanted
RUN pg_config --version

#RUN pip3 install psycopg2

# Install any needed packages specified in requirements.txt
RUN pip3 install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

# Run the app. CMD is required to run on Heroku
# $PORT is set by Heroku
CMD gunicorn --bind 0.0.0.0:$PORT wsgi

# Using an official Python runtime as a parent image
FROM python:3.8.0a3-stretch

# Setting the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable (test usage)
ENV NAME world PATH

# Run app.py when the container launches
CMD ["/bin/bash", "/app/ms-start.sh"]

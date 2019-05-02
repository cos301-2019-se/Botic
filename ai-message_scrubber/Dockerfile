# Using an official Python runtime as a parent image
FROM python:2.7-slim

# Setting the working directory to /app
WORDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable (test usage)
ENV NAME world

# Run app.py when the container launches
CMD ["python", "app.py"]
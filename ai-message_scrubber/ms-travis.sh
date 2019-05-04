#!/bin/sh
#get the service id of our application
docker service ls
#view services associated with the message-scrubber stack
docker stack services message-scrubber
#view the tasks of service
docker service ps message-scrubber_web
#view all tasks of stack
docker stack ps message-scrubber
#take down the app
docker stack rm message-scrubber
#take down the swarm
docker swarm leave --force
#
#
cat ~/password.txt | docker login --username=_ --password=stdin registry.heroku.com
ls
docker build -t registry.heroku.com/cryptic-hollows-60139/web .
docker push registry.heroku.com/cryptic-hollows-60139/web
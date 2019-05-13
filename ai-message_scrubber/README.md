# Botic: Message Scrubber

Message Scrubber identifies private data from messages sent by clients and client support personnel.

## Features
- scrub API which allows messages to be received for scrubbing
- private data has a severity index to indicate how severe it's leakage is
- independent and highly cohesive module
- available on Docker's public registry (anyone can use)

## Configuration

Message Scrubber listens on port 5000, as defined in the 'docker-compose.yml' file.

## Deployment

### Requirements
- Docker version 1.13 or higher
- Docker Compose: included in Docker Desktop for Mac and Docker Desktop for Windows. Linux systems require direct install. Pre Windows 10 systems without Hyper-V use Docker Toolbox.

Deploy Message Scrubber using the following commands:
```shell
git clone https://github.com/cos301-2019-se/Botic

cd ai-message-scrubber
docker swarm init

docker stack deploy -c docker-compose.yml message-scrubber
```

Scale Message Scrubber changing the number of replicas value in the docker-compose.yml, saving and then re-running the deployment command above.

To take it down, as well as the swarm, use the following commands:
```shell

docker stack rm message-scrubber
docker swarm leave --force
```

Deploy using Heroku: 
```shell
git clone https://github.com/cos301-2019-se/Botic
cd ai-message-scrubber

hekoru login
heroku container:login

docker build -t registry.heroku.com/cryptic-hollows-60139/web .
docker push registry.heroku.com/cryptic-hollows-60139/web
 
heroku container:release web --app cryptic-hollows-60139
```
## Testing
### Unit Tests
Pytest is used for unit testing.

Note: the message-scrubber has to already be running before the tests can execute.
```shell
pytest --cov-report term-missing --cov -W ignore::DeprecationWarning
```

### Integration Testing
Postman is used for integration testing. Use the link to get the Postman collection:
https://www.getpostman.com/collections/df6fb49c6d605971f0ce

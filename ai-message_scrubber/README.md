# Botic: Message Scrubber

Message Scrubber identifies private data from messages sent by clients and client support personnel.

## Features
- scrub API which allows messages to be received for scrubbing
- private data has a severity index to indicate how severe it's leakage is
- independent and highly cohesive module
- available on Docker's public registry (anyone can use)

## Configuration

Message Scrubber listens on port 4000, as defined in the 'docker-compose.yml' file.

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
docker stack rm alabamaliquidservices/botic:latest-ms
docker swarm leave --force
```

## Testing
### Unit Tests
Pytest is used for unit testing.
```shell
<commands-here>
```

### Integration Testing
Postman is used for integration testing.
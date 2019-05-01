---
id: docker
title: Self Hosting With Docker
sidebar_label: Self Hosting With Docker
---

## Prerequisites
1. A working reverse proxy webserver using https.  Nginx is recommended and [LinuxServer.io](https://linuxserver.io) have a [LetsEncrypt](https://hub.docker.com/r/linuxserver/letsencrypt/) container with Nginx and comes with [preconfigured reverse-proxy configs](https://github.com/linuxserver/docker-letsencrypt#site-config-and-reverse-proxy) for Kanzi included.
2. Kodi configured as discussed [here](https://lexigr.am/docs/getting-started.html#kodi-setup) and make a note of the IP address, port, username and password.

## Run the docker container

### docker

```
docker create \
  --name=kanzi \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e INVOCATION_NAME=kanzi \
  -e URL_ENDPOINT=https://server.com/kanzi/ \
  -p 8000:8000 \
  -v </path/to/appdata/config>:/config \
  --restart unless-stopped \
  linuxserver/kanzi
```
- If you are starting the LetsEncrypt and Kanzi containers via command line, first create a bridge network via `docker network create [networkname]` and define that network in the container run/create command via `--network [networkname]`

### docker-compose

- If you are starting the LetsEncrypt and Kanzi containers using docker-compose and the containers are managed through the same yaml file, docker-compose will automatically create a custom network and attach all containers to it. You don't have to do anything extra for the preconfigured reverse proxy configs to work.

Compatible with docker-compose v2 schemas.

```
---
version: "2"
services:
  kanzi:
    image: linuxserver/kanzi
    container_name: kanzi
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/London
      - INVOCATION_NAME=kanzi
      - URL_ENDPOINT=https://server.com/kanzi/
    volumes:
      - </path/to/appdata/config>:/config
    ports:
      - 8000:8000
    restart: unless-stopped
```
### Parameters

| Parameter | Function |
| :----: | --- |
| `-p 8000` | Application Port |
| `-e PUID=1000` | for UserID - see below for explanation |
| `-e PGID=1000` | for GroupID - see below for explanation |
| `-e TZ=Europe/London` | Specify a timezone to use EG Europe/London. |
| `-e INVOCATION_NAME=kanzi` | Specify an invocation name for this skill, use either kanzi or kod. |
| `-e URL_ENDPOINT=https://server.com/kanzi/` | Specify the URL at which the webserver is reachable either `https://kanzi.server.com/` or `https://server.com/kanzi/` Note the trailing slash **MUST** be included. |
| `-v /config` | Configuration files. |

### User / Group Identifiers

When using volumes (`-v` flags) permissions issues can arise between the host OS and the container, we avoid this issue by allowing you to specify the user `PUID` and group `PGID`.

Ensure any volume directories on the host are owned by the same user you specify and any permissions issues will vanish like magic.

In this instance `PUID=1000` and `PGID=1000`, to find yours use `id user` as below:

```
  $ id username
    uid=1000(dockeruser) gid=1000(dockergroup) groups=1000(dockergroup)
```


## Amazon account setup
Before you can add a custom skill to Alexa, Amazon requires that you have a 'developer' account. You can get everything setup [here](http://developer.amazon.com/). Just login with your normal Amazon account and it'll walk you through a few steps you have to take.

### Initializing cli
Execute the following command on your docker host to use the cli to login to Amazon. **Make sure you use the name 'default'.** If the prompt asks you if you would like to continue even though it can't find AWS credentials, just type `y` and hit enter.
```bash
docker exec -itw /config kanzi lexigram login --no-browser true
```
Copy the resulting URL into a browser and then copy & paste the authorisation code shown after you login.

### Edit kodi.config
Your `kodi.config` file is already in `/config` so you need to configure this to suit your setup.  

At a minimum you need to fill in the parameters below appropriately, with the information from number 2 of the prerequisites.  
Here is an example of a Kodi install on `192.168.0.30` using the default port of `8080` and with the default username of `kodi` and default password of `kodi`
```bash
#
# Default parameters common to all Alexa devices and the web simulator
#
[DEFAULT]
# The Kodi webserver only supports HTTP, but if you've set up a reverse HTTPS
# proxy you can change this to https.
scheme   = http
address  = 192.168.0.30
port     = 8080
# If using a reverse proxy you might need to add an extra bit to the url
# before "jsonrpc" (don't use slashes before or after).
subpath  =
username = kodi
password = kodi
```
## Deploy Kanzi
Restart the docker container to deploy Kanzi automatically to your Amazon developer account.

## Reverse Proxy

If you're using thre LinuxServer.io LetsEncrypt container then it comes packaged with a working config for Kanzi, further details [here.](https://github.com/linuxserver/docker-letsencrypt#site-config-and-reverse-proxy)

If you prefer to roll your own reverse proxy then the below location blocks should work with Nginx just fine.

#### Subfolder
 ```
 location /kanzi {
   rewrite           ^/kanzi/(.*)  /$1  break;
   proxy_pass         https://$IP-ADDRESS:8000;
   proxy_redirect     https://$IP-ADDRESS:8000 /kanzi;
   proxy_set_header   Host $host;
   proxy_set_header   X-Real-IP $remote_addr;
   proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header   X-Forwarded-Server $host;
   proxy_set_header   X-Forwarded-Host $server_name;
 }
 ```
#### Subdomain
 ```
   location / {
   proxy_pass         https://$IP-ADDRESS:8000;
   proxy_set_header   Host $host;
   proxy_set_header   X-Real-IP $remote_addr;
   proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header   X-Forwarded-Server $host;
   proxy_set_header   X-Forwarded-Host $server_name;
 }
 ```
 
 If at any point you wish to redeploy Kanzi then delete the file `/config/deployed-kanzi.txt`
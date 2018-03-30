---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Initial computer setup
The recommended way of setting up the skill involves using a command line interface that we have developed. To use this program, a framework called NodeJS is needed for it to run.

One of the the easiest way to get Node is to use nvm.
 - For Linux/Mac users: click [here](https://github.com/creationix/nvm).
 - For Windows users: click [here](https://github.com/coreybutler/nvm-windows).

Once you have that installed, run this command:
``` bash
nvm install 8
```
This will install Node version 8 which will allow us to run the cli.

### Installing the cli
After Node is setup, installing the cli couldn't be any easier:
``` bash
npm install -g lexigram-cli
```

### Initializing cli
Now, use the cli to login to Amazon:
``` bash
lexigram aws
```
And download an empty config file that you'll use later:
``` bash
lexigram init-config
```

## Kodi setup
Before a command from Alexa can be sent to [Kodi](https://kodi.tv), you need to enable the following settings found under _Settings -> System -> Services -> Web server_ in [Kodi](https://kodi.tv):

- Allow remote control via HTTP
- Allow remote control from applications on this system
- Allow remote control from applications on other systems

Note that wording might change depending on the version of [Kodi](https://kodi.tv) you have installed.  This example is for [Kodi](https://kodi.tv) 17:

![Kodi settings](http://i.imgur.com/YMqS8Qj.png)

Next, supply a _Username_ and _Password_ that you don't use anywhere else.  You can share these credentials with all of your [Kodi](https://kodi.tv) installations, but you should not use the same credentials you might use elsewhere on the web.

Repeat this for every installation of [Kodi](https://kodi.tv) you have that you wish to control via the skill.  All of this information -- including the port number -- can be the same for every installation of [Kodi](https://kodi.tv) if you wish.  If you are unsure, set up every instance of [Kodi](https://kodi.tv) the same way to avoid confusion.

Unless you have a very specific reason to do so, there is no reason to change the port number from the default.  Your router will control access from the outside world.

_Make note of the port, username, and password you are using for later steps._

_If you have more than one instance of [Kodi](https://kodi.tv) you would like to control with this skill, make note of the private IP address for each machine as well.  Private IP addresses are typically addresses like 192.168.1.9 or 192.168.0.23_

### Note regarding MySQL and performance

If you are using [MySQL](https://www.mysql.com) as a database backend for [Kodi](https://kodi.tv), please note that there are known issues with the optimizer in [MySQL](https://www.mysql.com) 5.7.6+ that will cause any commands that involve queueing items in bulk to be tremendously slow.  There is nothing in the skill we can do to fix this, as it is technically a [MySQL](https://www.mysql.com) bug/limitation; however, you can either stay on [MySQL](https://www.mysql.com) < 5.7.6 or you can easily migrate to another that doesn't have this problem, such as [MariaDB](https://mariadb.org).

As far as we are aware, [SQLite](https://sqlite.org) (the default) and [Emby](https://emby.media) do not share this issue.

## Obtaining Your Internet Address

This skill is hosted in the "cloud," unless you opt to host it yourself locally.  As such, it will need to know your internet address to contact [Kodi](https://kodi.tv).

While you can use your [public IP address](http://www.whatsmyip.org/), with most residential internet providers this address can change over time, which would necessitate setting up the skill again.

To avoid this, before you continue, we suggest you set up what's called a _Dynamic Domain Name_ with a service provider such as [Dynu](http://www.dynu.com/).  HowToGeek.com provides a [guide for setting this up](https://www.howtogeek.com/66438/how-to-easily-access-your-home-network-from-anywhere-with-ddns/).

Whether you choose to use your [public IP address](http://www.whatsmyip.org/) or obtain a dynamic domain name, _make note of it before continuing_.

## Router Setup

Unless you are hosting the skill locally, it is required that you have the [Kodi](https://kodi.tv) web server(s) opened up to the internet via port forwarding on your router.

For each [Kodi](https://kodi.tv) instance, you will need a port forwarding rule on your router.  For each _private_ IP address (i.e., the local address of each machine on which [Kodi](https://kodi.tv) is installed), you need to forward a unique _external_ port to that _private_ IP address on your router.

If you followed our suggestion and set up all of your [Kodi](https://kodi.tv) instances with the default port, you would forward them all like so:

- Kodi1: external port 8080, internal -> 192.168.1.10:8080
- Kodi2: external port 8081, internal -> 192.168.1.11:8080
- Kodi3: external port 8082, internal -> 192.168.1.12:8080

And so on for each instance of [Kodi](https://kodi.tv) that you wish to control via the skill.  The key here is that the _external port number_ needs to be unique for each instance.

For more information on port forwarding, see this [HowToGeek guide](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/).
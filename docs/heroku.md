---
id: heroku
title: Heroku
sidebar_label: Heroku
---

## Pricing
[Heroku](https://heroku.com/) is a great way to get a server running for free, but there is a small limitation with the free tier on Heroku where the 'dyno' will go to sleep after 30 minutes of in-activity. This might cause some commands to timeout, but so far it seems to be the best option for getting up and running as quickly as possibly. To get around this, you can either pay for a "Hobby" server which is only $7/month. If you really don't want to pay, there is a work-a-round where you get enough free hours per month to leave the server running 24/7 if you add your Credit Card to your account. Then you can use something like [Kaffeine](http://kaffeine.herokuapp.com/) to keep it from spinning down.

## Limitations
Currently we do not support addressing multiple instances of Kodi with Heroku.  If you wish to control multiple instances of Kodi, you will need to set up multiple copies of the skill to do so.

## Setup
After you have set up an Heroku account, click on one of the buttons below to provision a new server. Select a unique name to make upgrades easy.

Skill|Deploy
-----|-------
Kanzi|[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy/?template=https://github.com/m0ngr31/kanzi)
Koko|[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy/?template=https://github.com/m0ngr31/koko)



_Make note of the endpoint_
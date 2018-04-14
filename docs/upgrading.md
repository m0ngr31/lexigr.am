---
id: upgrading
title: Upgrading
sidebar_label: Upgrading
---

There are updates fairly regularly. Here's the instructions to update everything fairly easily. It is recommended to upgrade your server when you update the skill.

## lexigram-cli
To upgrade the cli, type this in your terminal:
``` bash
npm upgrade -g lexigram-cli
```

## Skill
All it takes when there is a new version to upgrade the skill is this:
``` bash
lexigram deploy kanzi
```
OR
``` bash
lexigram deploy koko
```

## Heroku
Just delete the existing app from your Heroku Dashboard, and create another with the button below with the same name you gave earlier.

Skill|Deploy
-----|-------
Kanzi|[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy/?template=https://github.com/m0ngr31/kanzi)
Koko|Not available yet


## AWS Lambda
Log into [AWS](https://console.aws.amazon.com/lambda/), and just upload the new zip you created with:
``` bash
lexigram generate-function kazni
```
OR
``` bash
lexigram generate-function koko
```
![Upload](https://i.imgur.com/z0DhOex.png "Upload")
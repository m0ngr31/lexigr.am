---
id: aws-lambda
title: AWS Lambda
sidebar_label: AWS Lambda
---

Lambda is a great service which lets the skill run "serverless." AWS provides credits for new accounts and should allow you to run everything the skill needs for free for 12 months. Once you are being billed for it, it will be less than $0.20/month. Very reasonable for what it offers.

Running the server on AWS Lambda is pretty simple, mainly, all it takes is uploading a zip file to their interface.

## Create the zip file
If you have edited `kodi.config` file already and used the cli to set everything else up, just run:
``` bash
lexigram generate-function kanzi
```
OR
``` bash
lexigram generate-function koko
```

## Upload to AWS Lambda
Log into the [AWS Console here](https://console.aws.amazon.com) and head to the [Lambda section](https://console.aws.amazon.com/lambda/). Make sure that your region is set to one of these regions (choose the one closest to you):
 - Asia Pacific (Tokyo)
 - EU (Ireland)
 - US East (N. Virginia)
 - US West (Oregon)

Click on create a new function and fill out the form to look like this:
![Create function](https://i.imgur.com/FEN9Bre.png "Create Function")

Next, add 'Alexa Skills Kit' as a trigger to the function:
![ASK](https://i.imgur.com/K3XYDCN.png "ASK")
You don't need to add to add skill verification since the server takes care of that if you want

Now, change the default memory and timeout values:
![Change defaults](https://i.imgur.com/kxVKesW.png "Change defaults")

Finally, upload the zip, change the handler to `alexa.lambda_handler`, and hit save:
![Upload](https://i.imgur.com/z0DhOex.png "Upload")

In the top right of the page, you'll see something that looks like this:
![ARN](https://i.imgur.com/bwfoSc2.png "ARN")
Copy this address since you'll need it to deploy the skill.





---
id: additional-config
title: Additional Configuration
sidebar_label: Additional Configuration
---

## Additional Validation of Requests

To verify that incoming requests are only allowed from your own copy of the skill, you can set the `skill_id` configuration variable to your own Application ID; e.g., `amzn1.ask.skill.deadbeef-4e4f-ad61-fe42-aee7d2de083d`

## Extra Settings for More Functionality

Setting the `timezone` configuration variable will make it so when you ask how long something has left playing, it'll also tell you when it will end according to your local wall-clock time.

Setting `scheme` to `https` allows you to talk to Kodi securely, but this requires that you set up a reverse HTTPS proxy.

By default, the skill allows very generic queries such as, `play 99 red balloons` or `shuffle the office`.  These very generic commands can be slow however, and may cause timeouts.  If these timeouts bother you, you can direct the skill to provide help playing media more specifically instead when it encounters these kinds of requests, by disabling `deep_search`.

## Controlling More Than One Instance of Kodi

As of version 2.6 of the skill, it can now control more than one instance of Kodi.  The skill determines which instance to talk to by determining which Echo device received the command.

You set up the mapping in the `kodi.config` file. There are a few examples there with dummy device IDs.

If a device ID isn't explicitly present in the config file, it will utilize the details in the `[DEFAULT]` section.  So, for example, if you wanted most of your devices to send commands to Kodi in your living room, you would set the `[DEFAULT]` section to point at that instance.  For any that you want to override -- say, office and master bedroom -- you would define override sections with those device IDs.

Further, for override sections, if a variable isn't defined, it will inherit it from the `[DEFAULT]` section.  Thus, if the only thing you need to change is `address` and `port`, define just those in the override.  You do not need to copy all of the other variables as well.

### Getting the device IDs

When you send a request to the skill, it will log an entry on the skill's server that will look something like this:

```
Sending request to http://mydomain.com:8080/jsonrpc from device amzn1.ask.device.AEFDXCGLSFJFNGCVF8SDJF90FID9G284JDJFGJGHH83358DJFFGIGD734JJDFGK211GDFFHHH23HGFJTYEFGJRT56KJDHDFJ5546DJDFFSWOPPP677P88P873EHZNZDFEIRTYIN2239NDFGIH724JDFKS2AA
```

For AWS Lambda, you can access your logs on [Cloudwatch](https://console.aws.amazon.com/cloudwatch).

Look for a line that looks like the above.  The device ID is everything from `amzn1.ask.device.` to the end of the line.  Copy this text and paste it to the end of the `kodi.config` file, placing it within square brackets `[]`, like so:

```
[amzn1.ask.device.AEFDXCGLSFJFNGCVF8SDJF90FID9G284JDJFGJGHH83358DJFFGIGD734JJDFGK211GDFFHHH23HGFJTYEFGJRT56KJDHDFJ5546DJDFFSWOPPP677P88P873EHZNZDFEIRTYIN2239NDFGIH724JDFKS2AA]
```

Anything in square brackets denotes a new section.  In this section, you can override whatever variables you'd like.  In this example, this Echo device is my Echo Dot in the office, so I would do something like:

```
# Office Echo Dot
[amzn1.ask.device.AEFDXCGLSFJFNGCVF8SDJF90FID9G284JDJFGJGHH83358DJFFGIGD734JJDFGK211GDFFHHH23HGFJTYEFGJRT56KJDHDFJ5546DJDFFSWOPPP677P88P873EHZNZDFEIRTYIN2239NDFGIH724JDFKS2AA]
address = office-dot
```

## Caching Responses

Every time you make a request to find and/or play a media item, the skill will ask Kodi for all of the media items it has in its library of that media type.  For example, if you have a song library of 30,000 items and you ask for a particular song, the skill must retrieve the 30,000 songs from your library to match what you asked for with what you have.

As you can imagine, sending such a large response over the internet to your skill can take some time.  How long this takes is a function of your available internet upload bandwidth vs how large your library is.

For those with particularly large libraries or very slow uplinks, we provide the option to cache these responses somewhere closer to the skill.

When utilizing caching, you will need to make a voice request to clear out the old cache objects every time you make changes to your Kodi library.  'Changes' include adding a new item, removing an item, or editing an item.  In practice, most people simply add and remove items in their libraries, which requires instructing Kodi to notice the changes anyway.  So, if you get into the habit of using voice requests for this:

```
Alexa, ask Kodi to clean library
Alexa, ask Kodi to update library
```

everything will sort itself out.  If you forget to use the voice commands after a library change, the skill will not pick up your changes/additions.  In this case, just re-do the library update/clean via voice.

The configuration for the cache buckets is defined in the [device sections](#controlling-more-than-one-instance-of-kodi) of `kodi.config`.  This allows you to use more than one bucket if you wish to do so.  It is not necessary though even if you have more than one Kodi library: each cache object is named such that they won't collide.  However, the `clean library` and `update library` commands will clear out all objects in the bucket -- even those that don't pertain to the library you're updating or cleaning.  Therefore, it is up to you to decide if it's worth the extra configuration effort to use more than one bucket.

_If you only have one library or you are unsure, it will be simplest to just use one bucket by defining all of the cache configuration in the_ `[DEFAULT]` _section of_ `kodi.config`.

### Choosing a Backend

*Regardless of the location where you store the cached responses, bear in mind that you may incur charges to do so.*

We allow storage of cache objects currently in either an [Amazon S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) or on an [ownCloud](https://owncloud.org)/[nextCloud](https://nextcloud.com) server.

For most people, an [Amazon S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) will be the right choice here.  But please note that [Amazon may charge you for this service](https://aws.amazon.com/s3/pricing/).  It is very inexpensive, however, and it's highly likely that you'll fall under the Free Usage Tier if you're only using it for this skill.

For [Heroku](#heroku) users and those [self-hosting](#self-hosting) the skill, the backend you choose will mostly depend on which ends up being faster for you and whether or not your usage falls under the free tier for [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html).  If cost is not a consideration, feel free to try all backends and see what works best for you.

If you are [self-hosting](#self-hosting) the skill local to your Kodi installation(s), you may wonder if this has any benefit for you.  It will, if you already have or want to set up an [ownCloud](https://owncloud.org)/[nextCloud](https://nextcloud.com) server local to your Kodi installation(s).  Since the requests the skill makes to Kodi involve a database query as well as the hit to its relatively-slow-web-server, retrieving the responses from a cache can shave off a little time.  How much really depends on your hardware and database configuration; the difference will probably be small, but if you've read this far, such an optimization might be worth the effort for you.

### Security Considerations

For all cache backends, you should use credentials that only provide access to the cache bucket and nothing else.  The primary concern here is that the credentials are stored in `kodi.config`, which is stored in your skill deployment.  If you can't secure the skill deployment, you should create a user that _only_ has access to the cache.

A secondary consideration is that this can put your library items in public view.  The cache objects themselves will not directly divulge personally identifying information, but your account credentials can tie the data to you if someone gained access to them.

### Configuring for Amazon S3

The first thing you need to do is [sign up for Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html) if you haven't already.  Next, [create a unique bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) in which the skill can store cache objects.  It is recommended that you use a randomized name for the bucket if possible.

For the bucket you create, you definitely should not use your root credentials, and ideally, you shouldn't use admin credentials either.  If you deployed the skill via [AWS Lambda](#aws-lambda), 'admin credentials' would be the the keys for the `kodi-alexa` user described there.

It would be best to [create another user with only the ability to list buckets and administer the cache bucket](http://mikeferrier.com/2011/10/27/granting-access-to-a-single-s3-bucket-using-amazon-iam/) via the [IAM Management Console](https://console.aws.amazon.com/iam/home).

However, if you don't use S3 for anything else that you consider important or private, you're welcome to use the `kodi-alexa` user credentials for the rest of this.

For each bucket you have created, you will need to add the following to either the `[DEFAULT]` section or the appropriate [device section](#controlling-more-than-one-instance-of-kodi):

```
cache_bucket = your_bucket_name
s3_cache_aws_access_key_id = your_access_key_id
s3_cache_aws_secret_access_key = your_secret_key
```

For example:

```
[DEFAULT]
cache_bucket = kodi-alexa-7ce4fea901
s3_cache_aws_access_key_id = AKQJ56NSL3XGGLQYDT0L
s3_cache_aws_secret_access_key = iCmj7ag+mdxkcDLcst/gAMDXrjkp0j7toMMDrrkJ

# Office Echo Dot
[amzn1.ask.device.AEFDXCGLSFJFNGCVF8SDJF90FID9G284JDJFGJGHH83358DJFFGIGD734JJDFGK211GDFFHHH23HGFJTYEFGJRT56KJDHDFJ5546DJDFFSWOPPP677P88P873EHZNZDFEIRTYIN2239NDFGIH724JDFKS2AA]
cache_bucket = kodi-alexa-4fae019a1f
```

### Configuring for ownCloud or nextCloud

You will need to provide credentials for a user that can create the bucket (folder/directory) that you specify at the root of each URL you provide.

For each bucket, you will need to add the following to either the `[DEFAULT]` section or the appropriate [device section](#controlling-more-than-one-instance-of-kodi):

```
cache_bucket = your_bucket_name
owncloud_cache_url = https://my.owncloudserver.com/owncloud/
owncloud_cache_user = username
owncloud_cache_password = password
```

For example:

```
[DEFAULT]
cache_bucket = kodi-alexa-7ce4fea901
owncloud_cache_url = https://my.owncloudserver.com/owncloud/
owncloud_cache_user = username
owncloud_cache_password = password

# Office Echo Dot
[amzn1.ask.device.AEFDXCGLSFJFNGCVF8SDJF90FID9G284JDJFGJGHH83358DJFFGIGD734JJDFGK211GDFFHHH23HGFJTYEFGJRT56KJDHDFJ5546DJDFFSWOPPP677P88P873EHZNZDFEIRTYIN2239NDFGIH724JDFKS2AA]
cache_bucket = kodi-alexa-4fae019a1f
```
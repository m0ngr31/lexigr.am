---
id: what-is-koko
title: What is Koko?
sidebar_label: What is Koko?
---

This is a skill for Amazon Alexa that allows you to stream your music from a Kodi box to your Alexa device.

This skill supports streaming music from your Kodi device over the internet to Alexa. Unfortunately, session data between commands when playing music is not saved by Alexa. So you have to use a database to keep track of everything. I selected MongoDB to handle this since it runs on everything. If you don't want to run it on your own server, you can use a service like [mLab](https://www.mlab.com/) which provides a free tier that works great for this.

Disclaimer: **You must accept the agreement in the config saying that I'm not liable for stolen information since your username and password for Kodi will be stored in plaintext in a database and will be transferred over the internet to a HTTPS proxy server for you to have this functionality.**

You'll need to configure the `mongodb_uri` and `accept_music_warning` variables makes it so you can stream music from your Kodi device over the internet to Alexa.

Since Alexa requires that all music it streams use HTTPS traffic, you'll need a proxy to provide this because Kodi only has plain HTTP. The `use_proxy` variable will enable your music to stream through a [simple proxy I built](https://github.com/m0ngr31/kodi-music-proxy) to make it easy. The `alt_proxy` variable is there if you want to self host the proxy server so you don't have to trust or rely on mine.
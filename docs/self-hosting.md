---
id: self-hosting
title: Self Hosting
sidebar_label: Self Hosting
---

If you are savvy enough to run your own web server, this is just a bog-standard WSGI app, and you're free to host it on any web server, provided it supports HTTPS.  You will have to generate your own SSL certificate, be it self-signed or via a Certificate Authority (CA), such as [Let's Encrypt](https://letsencrypt.org/).  This is an Amazon requirement.

You will need to create the file `kodi.config` from the [kodi.config.example template](https://raw.githubusercontent.com/m0ngr31/kodi-voice/master/kodi_voice/kodi.config.example).  The template file contains comments to describe the options.

Install the modules in `requirements.txt`.
#!/bin/bash
curl -s https://api.github.com/repos/TheHippo/mmplus/releases | jq '.[0].assets[0].browser_download_url'

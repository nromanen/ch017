#!/bin/bash
export SETTING_HTACCESS=../.htaccess
sed -i -e "s/127.0.0.1:3000/127.0.0.1:8000/" $SETTING_HTACCESS

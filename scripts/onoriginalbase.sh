#!/bin/bash
export SETTING_DJANGO=../backend/app_serverside/settings.py
export SETTING_NODE=../server/model/mongodb.js
sed -i -e "s/'NAME': 'todos_test'/'NAME': 'todos'/" $SETTING_DJANGO
sed -i -e "s/'mongodb:\/\/localhost:27017\/todoDb_test'/'mongodb:\/\/localhost:27017\/todoDb'/" $SETTING_NODE

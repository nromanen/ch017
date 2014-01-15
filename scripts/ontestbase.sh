#!/bin/bash
export SETTING_DJANGO=../backend/app_serverside/settings.py
export SETTING_NODE=../server/model/mongodb.js
sed -i -e "s/'NAME': 'todos'/'NAME': 'todos_test'/" $SETTING_DJANGO
sed -i -e "s/mongodb:\/\/localhost:27017\/todoDb/mongodb:\/\/localhost:27017\/todoDb_test/" $SETTING_NODE
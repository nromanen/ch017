#!/bin/bash
export SETTING_DJANGO=../backend/app_serverside/settings.py
export SETTING_NODE=../server/model/mongodb.js
export MEDICINES=../dumps/mongodb/medicines.json
export ROLES=../dumps/mongodb/roles.json
export USERS=../dumps/mongodb/users.json
export SQLSCRIPT=../dumps/todos_test.sql 
sed -i -e "s/'NAME': 'todos'/'NAME': 'todos_test'/" $SETTING_DJANGO
sed -i -e "s/'mongodb:\/\/localhost:27017\/todoDb'/'mongodb:\/\/localhost:27017\/todoDb_test'/" $SETTING_NODE

mongoimport --db todoDb_test --collection medicines --file $MEDICINES --jsonArray
mongoimport --db todoDb_test --collection roles --file $ROLES --jsonArray
mongoimport --db todoDb_test --collection users --file $USERS --jsonArray
echo psql -U developer -d todos_test -a -f $SQLSCRIPT

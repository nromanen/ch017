#!bin/sh

echo 'making dump'
python manage.py dumpdata todos.users --indent 4 > dump/users.json
python manage.py dumpdata todos.todo --indent 4 > dump/todos.json
python manage.py dumpdata todos.medicines --indent 4 > dump/medicines.json
python manage.py dumpdata todos.time --indent 4 > dump/times.json
python manage.py dumpdata todos.role --indent 4 > dump/roles.json
echo "=========================================================="
echo 'dump was created!!! Start convertation django dump to mongo valid format'
python sql_dump2mongo.py dump/users.json mongo_dump/users.json
python sql_dump2mongo.py dump/todos.json mongo_dump/todos.json
python sql_dump2mongo.py dump/medicines.json mongo_dump/medicines.json
python sql_dump2mongo.py dump/times.json mongo_dump/times.json
python sql_dump2mongo.py dump/roles.json mongo_dump/roles.json
echo "========================================================="
echo "sync with mongo"
cd mongo_dump
mongoimport --db todoDb --collection users --type json --file users.json 
mongoimport --db todoDb --collection todos --type json --file todos.json 
mongoimport --db todoDb --collection times --type json --file times.json 
mongoimport --db todoDb --collection roles --type json --file roles.json
mongoimport --db todoDb --collection medicines --type json --file medicines.json 




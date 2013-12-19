
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var todo = require('./routes/todo');
var http = require('http');
var path = require('path');
var db = require('./db/mongodb');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//create tables
/*db.initialize(function(err) {
    if(err) throw err;

    var todo = db.mongoDb.collection("todo");
    todo.insert({
        text: "some text",
        done: false,
        datetime_created: new Date(),
        datetime_finished: new Date(),
        amount: 2,
        time: [{time: new Date(), done: false}]
    }, function(err, result) {
        if (!err) console.log("success!");
    });
});*/

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/todos', todo.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

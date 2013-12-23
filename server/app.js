
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require("./urls");
var db = require("./model/mongodb");

var app = express();
var baseRoute = "/api/";

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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//create test records
db.runStatement(function() {

    /*db.tables.Todo({
        text: 'first task',
        date_created: new Date(),
        date_finished: new Date(),
        _time: [],
        amount: 2
    }).save(function (err, todo, numberAffected) {
        if (err) throw err;
        db.tables.Role({name: "Doctor"}).save(function(err, role){
            db.tables.User({
                first_name: 'Oleg',
                last_name: 'Fostiy',
                login: 'patient',
                password: 'admin',
                _todo: todo._id,
                _role: role._id
            }).save(function (err, todo, numberAffected) {
                if (err) throw err;
            });
        });
    });*/

    db.tables.User.find().populate('_todo _role').exec(function(err, res) {
        console.log(res);
    });
});


//create routes
routes.route(app, baseRoute);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

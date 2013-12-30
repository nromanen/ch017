var db = require('../model/mongodb');

exports.all = function(req, res){

    db.tables.Todo.find(function(err, data) {

        if(err) return res.json(500, {error: err});

        return res.send(data);

    });
};

exports.forSpecificUser = function(req, res) {
    var password = new Buffer(req.params.password, 'base64').toString();

    db.tables.User.findOne({login: req.params.login, password: password}).
    populate("_todo").exec(function(err, user) {

        if(err) return res.json(500, {error: err});

        res.json(user._todo);
    });
};

exports.createTodo = function(req, res) {

};

exports.updateTodo = function(req, res) {

};

exports.deleteTodo = function(req, res) {

};

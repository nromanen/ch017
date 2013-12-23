var db = require('../model/mongodb');

exports.all = function(req, res){

    db.initialize(function(err) {
        if(err) res.json(500, {error: err});

        var todo = db.mongoDb.collection("todo");
        todo.find().toArray(function(err, result) {
            if(err) res.json(500, {error: err});

            res.json(result);
        });
    });
};

exports.forSpecificUser = function(req, res){

    db.initialize(function(err) {
        if(err) res.json(500, {error: err});

        var todo = db.mongoDb.collection("todo");
        todo.find().toArray(function(err, result) {
            if(err) res.json(500, {error: err});

            res.json(result);
        });
    });
};

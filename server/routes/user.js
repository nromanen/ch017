var db = require('../model/mongodb');

exports.all = function(req, res){
    db.initialize(function(err) {
        if(err) res.json(500, {error: err});

        var user = db.mongoDb.collection("user");
        user.find().toArray(function(err, result) {
            if(err) res.json(500, {error: err});

            res.json(result);
        });
    });
};

exports.getUser = function(req, res){
  res.send("respond with a resource");
};

exports.usersByRole = function(req, res){
  res.send("respond with a resource");
};
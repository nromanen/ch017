var db = require('../model/mongodb');

exports.all = function(req, res){

    db.tables.User.find().populate('_todo _role').exec(function(err, data) {

        if(err) return res.json(500, {error: err});

        return res.send(data);


    });

};

exports.getUser = function(req, res) {
  res.send("respond with a resource");
};

exports.usersByRole = function(req, res) {
  res.send("respond with a resource");
};

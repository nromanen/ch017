var db = require('../model/mongodb');

exports.all = function(req, res){

    db.tables.Role.findOne({name: "Doctor"}, function(err, role) {

        if(err) return res.json(500, {error: err});

        db.tables.User.find({_role: role._id}).populate("_role _todo").exec(function(err, users) {

            if(err) return res.json(500, {error: err});

            res.json(users);
        });
    });
};

exports.getUser = function(req, res) {
  res.send("respond with a resource");
};

exports.usersByRole = function(req, res) {
  res.send("respond with a resource");
};

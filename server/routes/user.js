var db = require('../model/mongodb');

exports.usersByRole = function(req, res){

    db.tables.Role.findOne({name: req.params.role}, function(err, role) {

        if(err) return res.json(500, {error: err});

        db.tables.User.find({_role: role._id}).populate("_role _todo").exec(function(err, users) {

            if(err) return res.json(500, {error: err});

            res.json(users);
        });
    });
};

exports.getUser = function(req, res) {
   var password = new Buffer(req.params.password, 'base64').toString();

   db.tables.User.find({login: req.params.login, password: password}).
   populate("_role _todo").exec(function(err, users) {

        if(err) return res.json(500, {error: err});

        res.json(users);
    });
};

exports.all = function(req, res) {
    db.tables.User.find().populate("_role _todo").exec(function(err, users) {

        if(err) return res.json(500, {error: err});

        res.json(users);
    });
};

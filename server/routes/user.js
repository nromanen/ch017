var db = require('../model/mongodb');

exports.usersByRole = function(req, res){

    db.tables.Role.findOne({name: req.params.role}, function(err, role) {

        if(err) return res.json(500, {error: err});

        db.tables.User.find({role: role.id}).populate("role todo").exec(function(err, users) {

            if(err) return res.json(500, {error: err});

            db.tables.Todo.populate(users, {
                path: 'todo.time',
                // select: 'datetime'
                model: db.tables.Time
            }, function(err, users){  res.json(users);});
        });
    });
};

exports.getUser = function(req, res) {
   var password = new Buffer(req.params.password, 'base64').toString();

   db.tables.User.findOne({login: req.params.login, password: password}).
   populate("role todo").exec(function(err, user) {

        if (user === null) return res.json(500, {error: "Wrong password or username"});
        if(err) return res.json(500, {error: err});
        db.tables.Todo.populate(user, {
            path: 'todo.time',
            // select: 'datetime'
            model: db.tables.Time
        }, function(err, users){  res.json(users);});
        //res.json(user);
    });
};

exports.all = function(req, res)
{
    db.tables.User.find().populate("role todo").exec(function(err, users) {

        if(err) return res.json(500, {error: err});

        db.tables.Todo.populate(users, {
            path: 'todo.time',
           // select: 'datetime'
            model: db.tables.Time
        }, function(err, users){  res.json(users);});
    });
};

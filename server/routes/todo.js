var db = require('../model/mongodb');

exports.all = function(req, res){

    db.tables.Todo.find(function(err, data) {

        if(err) return res.json(500, {error: err});

        return res.send(data);

    });

};

exports.forSpecificUser = function(req, res) {
    res.send("respond with a resource");
};

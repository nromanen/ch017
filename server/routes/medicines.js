var db = require('../model/mongodb');

exports.index = function(req, res){

    db.initialize(function(err) {
        if(err) throw err;

        var todo = db.mongoDb.collection("todo");
        todo.find().toArray(function(err, result) {
            if (err) throw err;

            returnJsonResponse(res, result);
        });
    });
};

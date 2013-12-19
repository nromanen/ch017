var db = require('../db/mongodb');

exports.index = function(req, res){
    if (req.method !== "GET") throw "Permission denied!";

    db.initialize(function(err) {
        if(err) throw err;

        var todo = db.mongoDb.collection("todo");
        todo.find().toArray(function(err, result) {
            if (err) throw err;

            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(result));
            res.end();

        });
    });
};
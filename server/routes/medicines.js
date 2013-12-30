var db = require('../model/mongodb');

exports.index = function(req, res) {

    db.tables.Medicines.find().exec(function(err, data) {

        if(err) return res.json(500, {error: err});

        return res.send(data);

    });

};

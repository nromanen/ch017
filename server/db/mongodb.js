
module.exports = {

  initialize: function(next){
    // initialization actions, there can be many of these
    this.initializeDb(next);
  },

  initializeDb: function(next){
    var MongoClient = require('mongodb');

    MongoClient.connect("mongodb://localhost:27017/todoDb", function(err, db) {
        if (err) throw err;
        module.exports.mongoDb = db;
        next();
    });
  }
}
var db = require('../model/mongodb');

exports.all = function(req, res){

    db.tables.Todo.find(function(err, data) {

        if(err) return res.json(500, {error: err});

        return res.send(data);

    });
};

exports.forSpecificUser = function(req, res) {
    var password = new Buffer(req.params.password, 'base64').toString();
    db.tables.User.findOne({login: req.params.login, password: password}).
    populate("_todo").exec(function(err, user) {

        if(err) return res.json(500, {error: err});

        res.json(user.todo);
    });
};

exports.createTodo = function(req, res) {
    db.tables.User.findOne({_id: req.body.patient_id}, function (err, user){

        if(err) return res.json(500, {error: err});

        var todo = JSON.parse(req.body.data);
        var todoID = 0;
        db.tables.Todo.create( {  text: todo.text }, function(err, todoBase){
            todoID = todoBase.id;
            console.log(todoID);

            for(index = 0; index<todo.time.length; index++){
                var date = todo.time[index].date.split("-");
                var yyyy = date[0];
                var mm = date[1]-1;
                var dd = date[2];

                var time = todo.time[index].time.split(":");
                var h = time[0]+2;
                var m = time[1];
                var s = time[2];
                db.tables.Time.create( {  datetime: new Date(yyyy,mm,dd,h,m,s),
                     done: todo.time[index].done, todo: todoID }, function(err, timeBase){
                    if(err) return res.json(500, {error: err});
                    db.tables.Todo.update( { _id: todoID },{ $push: {time: timeBase.id}}, { upsert : true }, function(err){
                        if(err) return res.json(500, {error: err});
                    });
                });
                console.log(todo.time[index].time);
                console.log(todo.time[index].date);
            };
            db.tables.User.update( { _id: req.body.patient_id }, { $push: {todo: todoID}}, { upsert : true }, function(err){
                if(err) return res.json(500, {error: err});
            });

            console.log(todoID);
        });

    });

    console.log(req.body.data);
    res.json(req.body.patient_id);
};

exports.updateTodo = function(req, res) {
    db.tables.Todo.update(
        { _id: req.body.patient_id},
        { $set : { todo: req.body.data } },
        { upsert : true }
    )
};

exports.deleteTodo = function(req, res) {
    db.tables.Todo.remove({ _id: req.body.patient_id});
};

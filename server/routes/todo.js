var db = require('../model/mongodb');

exports.all = function(req, res){

    db.tables.Todo.find().populate("time").exec(function(err, todos) {

        if(err) return res.json(500, {error: err});

        return res.send(todos);

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

            for(index = 0; index<todo.time.length; index++){

                var datetime = new Date(todo.time[index].date);

                var time = todo.time[index].time.split(":");
                datetime.setHours(time[0]*1+2);
                datetime.setMinutes(time[1]);
                datetime.setSeconds(time[2]);

                console.log(datetime);

                db.tables.Time.create( {datetime: datetime,  //new Date(yyyy,mm,dd,h,m,s),
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
    db.tables.Todo.findOneAndRemove({ _id: req.params.todo_id-1}, function(err){

        if(err) return res.json(500, {error: err});
        db.tables.User.findOneAndUpdate({_id: req.params.user_id},{$pull: {todo: req.params.todo_id}},function(err){

            if(err) return res.json(500, {error: err});
        });
    });
};

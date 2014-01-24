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

    db.tables.User.findOne({ _id: req.params.user_id }).populate("role").exec(function(err, user) {

        if(err) return res.json(500, {error: err});
        if (!user.role.add) return res.json(500, {error: "you have no permission"});

        var todo = JSON.parse(req.body.data);
        var todoID = 0;

        db.tables.Todo.create( {  text: todo.text }, function(err, todoNew) {
            todoID = todoNew.id;

            for(var index = 0; index<todo.time.length; index++) {
                var date = todo.time[index].date.split('-');
                var time = todo.time[index].time.split(':');

                var datetime = new Date(date[0], date[1] - 1, date[2], parseInt(time[0]) + 2, time[1], '00');
                console.log(datetime);

                db.tables.Time.create( {
                    datetime: datetime,
                    done: todo.time[index].done, todo: todoID }, function(err, time) {

                    if(err) return res.json(500, {error: err});
                    db.tables.Todo.update(
                        { _id: todoID },
                        { $push: {time: time.id}},
                        { upsert : true }, function(err) {

                            if(err) return res.json(500, {error: err});
                    });
                });
                console.log(todo.time[index].time);
                console.log(todo.time[index].date);
            }
            db.tables.User.update(
                { _id: req.body.patient_id },
                { $push: {todo: todoID}},
                { upsert : true }, function(err) {

                    if(err) return res.json(500, {error: err});
            });
            console.log(todoNew.id)
            return res.json( {todo_id: todoNew.id} );
        });

    });
};

exports.updateTodo = function(req, res) {
    db.tables.User.findOne({ _id: req.params.user_id }).populate("role").exec(function(err, user){

        if(err) return res.json(500, {error: err});
        if (!user.role.edit) return res.json(500, {error: "you have no permission"});
    });
    var todo = JSON.parse(req.body.data);
    var todoID = todo.id;

    db.tables.Todo.update(
        { _id: todoID },
        { text: todo.text, time: [] }).exec(function(err){

            if(err) return res.json(500, {error: err});

            db.tables.Time.find({todo: todoID}).remove().exec(function(err) {
                for(var index = 0; index<todo.time.length; index++) {
                    var date = todo.time[index].date.split('-');
                    var time = todo.time[index].time.split(':');
                    var datetime = new Date(date[0], date[1] - 1, date[2], parseInt(time[0]) + 2, time[1], '00');
                    console.log(datetime, todoID)

                    db.tables.Time.create( {
                        datetime: datetime,
                        done: todo.time[index].done,
                        todo: todoID }, function(err, time) {

                        if(err) return res.json(500, {error: err});

                        db.tables.Todo.update(
                            { _id: todoID },
                            { $push: {time: time.id}},
                            { upsert : true }, function(err) {

                                if(err) return res.json(500, {error: err});
                            }
                        );
                    });
                }
            });
        });
    return res.json(todoID);
};

exports.deleteTodo = function(req, res) {

    db.tables.User.findOne({ _id: req.params.user_id }).populate("role").exec(function(err, user){

        if (!user.role.remove) return res.json(500, {error: "you have no permission"});
        if(err) return res.json(500, {error: err});
    });

        db.tables.Time.findOneAndRemove({ _id: req.params.time_id }, function(err){

           if(err) return res.json(500, {error: err});

           db.tables.Todo.findOne( {time : req.params.time_id }, function(err, todo){

               if(err) return res.json(500, {error: err});

               db.tables.Todo.update(
                   {time : req.params.time_id},
                   { $pull: { time: req.params.time_id}}, function(err, todo){

                       if(err) return res.json(500, {error: err});
               });

               db.tables.User.find({todo : todo._id}, function(err){

                   if(err) return res.json(500, {error: err});

                   db.tables.User.update(
                       {todo : todo._id},
                       { $pull: { todo: todo._id }}, function(err){

                           if(err) return res.json(500, {error: err});
                   });
               });
           });
        });
    db.tables.Todo.remove({ time: [] }, function(err){

        if(err) return res.json(500, {error: err});
    });
};
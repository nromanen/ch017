var user = require('./routes/user');
var todo = require('./routes/todo');
var medicines = require('./routes/medicines');

exports.route = function(app, baseRoute) {
    app.get([baseRoute, 'user/:login/:password/'].join(''), user.getUser);
    app.get([baseRoute, 'users_by_role/:role/'].join(''), user.usersByRole);
    app.get([baseRoute, 'users/'].join(''), user.all);
    app.get([baseRoute, 'todos/'].join(''), todo.all);
    app.post([baseRoute, 'create_todo/:user_id'].join(''), todo.createTodo);
    app.put([baseRoute, 'update_todo/:todo_id/:user_id'].join(''), todo.updateTodo);
    app.delete([baseRoute, 'delete_todo/:todo_id/:user_id'].join(''), todo.deleteTodo);
    app.get([baseRoute, 'medicines/'].join(''), medicines.index);
};

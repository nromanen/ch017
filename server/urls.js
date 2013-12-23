var user = require('./routes/user');
var todo = require('./routes/todo');
var medicines = require('./routes/medicines');

exports.route = function(app, baseRoute) {
    app.get([baseRoute, 'users/'].join(''), user.all);
    app.get([baseRoute, 'user/:login/:password/'].join(''), user.getUser);
    app.get([baseRoute, 'users_by_role/:role/'].join(''), user.usersByRole);
    app.get([baseRoute, 'todos/'].join(''), todo.all);
    app.get([baseRoute, 'todo/:login/:password/'].join(''), todo.forSpecificUser);
    app.get([baseRoute, 'medicines/'].join(''), medicines.index);
};

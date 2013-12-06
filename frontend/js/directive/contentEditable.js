
App.directive('contenteditable', ['db', function(db) {
    return {
        link: function(scope, elm, attrs, ctrl) {
            elm.on('blur', function() {
                scope.$apply(function() {
                    scope.currentPatient.todo[attrs.todoItem].text = elm.html();
                    db.editTodo(scope.currentPatient.todo[attrs.todoItem]);
                });
            });
        }
    };
}]);


App.directive('contenteditable', function() {
    return {
        link: function(scope, elm, attrs, ctrl) {
            elm.on('blur', function() {
                scope.$apply(function() {
                    scope.todoList[attrs.todoItem].text = elm.html();
                    scope.updateTodo();
                });
            });
        }
    };
});

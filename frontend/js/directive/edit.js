
App.directive('edit', ['$rootScope', function($rootScope) {
    return {
        link: function(scope, elm, attrs, ctrl) {
            elm.on('click', function() {
                scope.$apply(function() {
                    $rootScope.todoExample = scope.currentPatient.todo.filter(function (todo) {
                        return todo.id == attrs.todoItem;
                    })[0];
                    $rootScope.todoExample.time = $rootScope.todoExample.time.filter(function (time) {
                        return time.id == attrs.timeItem;
                    });
                    $rootScope.todoExample.edit = true;
                });
            });
        }
    };
}]);

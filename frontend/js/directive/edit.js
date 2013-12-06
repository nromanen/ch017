
App.directive('edit', ['$rootScope', function($rootScope) {
    return {
        link: function(scope, elm, attrs, ctrl) {
            elm.on('click', function() {
                scope.$apply(function() {
                    $rootScope.todoExample = scope.currentPatient.todo[attrs.todoItem];
                    $rootScope.todoExample.edit = true;
                });
            });
        }
    };
}]);

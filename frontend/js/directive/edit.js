
App.directive('edit', ['$rootScope', function($rootScope) {
    return {
        link: function($scope, element, attrs) {
            element.on('click', function() {
                $scope.$apply(function() {
                    $rootScope.todoExample = $scope.currentPatient.todo.filter(function(todo) {
                        return todo.id == attrs.todoItem;
                    })[0];

                    $rootScope.todoExample.edit = true;
                });
            });
        }
    };
}]);

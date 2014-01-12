
App.directive('edit', ['$rootScope', 'aux', function($rootScope, aux) {
    return {
        link: function($scope, element, attrs) {
            element.on('click', function() {
                $scope.$apply(function() {
                    $rootScope.todoExample = $scope.currentPatient.todo.filter(function(todo) {
                        return todo.id == attrs.todoItem;
                    })[0];

                    $rootScope.dateArr = $rootScope.todoExample.time.filter(function(time) {
                        return time.time == $rootScope.todoExample.time[0].time;
                    }).map(function(time) {
                        return time.date;
                    });

                    $rootScope.timeArr = $rootScope.todoExample.time.filter(function(time) {
                        return time.date == $rootScope.todoExample.time[0].date;
                    }).map(function(time) {
                        return time.time;
                    });

                    $rootScope.todoExample.edit = true;
                });
            });
        }
    };
}]);

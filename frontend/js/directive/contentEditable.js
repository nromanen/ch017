
App.directive('contenteditable', ['db', function(db) {
    return {
        link: function($scope, element, attrs) {
            element.on('blur', function() {

                $scope.$apply(function() {
                    $scope.currentPatient.todo[attrs.todoItem].text = element.html();
                    db.editTodo($scope.currentPatient.todo[attrs.todoItem]);
                });

            });
        }
    };
}]);


App.directive('updateLocalStorageOnChange', ['db', function(db) {
    return {
        link: function($scope, elm, attrs) {
            $scope.$watch('currentPatient', function(){
                $scope.updateLocalStorage();
                db.addTodo($scope.currentPatient.id, $scope.todoExample);

                $scope.todoExample = {
                    text: '',
                    done: false,
                    todo: []
                };
            }, true);
        }
    };
}]);

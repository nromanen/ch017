
App.directive('updateLocalStorageOnChange',['localStorageService', function() {
    return {
        link: function($scope, elm, attrs) {
            $scope.$watch('todoList', function(){
                $scope.updateLocalStorage();
            }, true);
        }
    };
}]);

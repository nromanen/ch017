
App.directive('updateLocalStorageOnChange', function() {
    return {
        link: function($scope, elm, attrs) {
            $scope.$watch('allTodos', function(){
                $scope.updateLocalStorage();
            }, true);
        }
    };
});


App.directive('updateLocalStorageOnChange', ['db', function(db) {
    return {
        link: function($scope, elm, attrs) {
            console.log(1);
            $scope.$watch('currentPatient', function() {
                $scope.updateLocalStorage();
            }, true);
        }
    };
}]);

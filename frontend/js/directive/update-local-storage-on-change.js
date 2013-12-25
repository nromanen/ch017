
App.directive('updateLocalStorageOnChange', ['db', function(db) {
    return {
        link: function($scope, elm, attrs) {
            $scope.$watch('currentPatient', function() {
                $scope.updateLocalStorage();
            }, true);
        }
    };
}]);


App.directive('updateUserScope', ['db', function(db) {
    return {
        link: function($scope, elm, attrs) {
            $scope.$watch('currentPatient', function() {
                $scope.updateUserScope();
            }, true);
        }
    };
}]);

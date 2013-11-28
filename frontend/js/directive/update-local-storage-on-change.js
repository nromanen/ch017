
App.directive('updateLocalStorageOnChange', function() {
    return {
        link: function($scope, elm, attrs) {
            $scope.$watch('currentPatient', function(){
                $scope.updateLocalStorage();
            }, true);
        }
    };
});

App.directive('buttonState', ['$rootScope', '$filter', function($rootScope, $filter) {
    return function($scope, element) {
    	if ($rootScope.currentUser.is_active || $rootScope.currentUser.is_doctor) return;

        if ($filter('filter')($rootScope.patientList, $rootScope.currentDate).length === 0) {
            $(element).addClass('disabled');
            return;
        }

        element.on('click', function() {
            $(element).toggleClass('active');
        });
    };

}]);

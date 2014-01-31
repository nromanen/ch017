App.directive('buttonState', ['$rootScope', '$filter', function($rootScope, $filter) {
    this.reloadPatientListVisual = function() {
        $('.patient-list .dropdown').fadeOut(150, function() {
            $('.patient-list .dropdown').fadeIn(150);
        });
    };

    return function($scope, element) {
        element.on('click', function() {
            if ($filter('filter')($rootScope.patientList, $rootScope.currentDate).length === 0) {
                $(element).addClass('disabled');
                return;
            }

            $(element).removeClass('disabled').removeClass('active');

            if ($scope.buttonState) $(element).addClass('active');

            reloadPatientListVisual();
        });
    };

}]);
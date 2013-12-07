
App.directive('calendar', function($rootScope, aux) {
    return {
        restrict: "E",
        templateUrl: './templates/patientCalendar.html',
        link: function(scope, element, attrs) {

            $('#patient-datepicker div').datepicker({
                format: "yyyy-mm-dd",
                weekStart: 1,
                keyboardNavigation: false,
                startDate: $rootScope.dateMin,
                endDate: $rootScope.dateMax
            }).
            datepicker('update', $rootScope.dateMax).
            on('changeDate', function(dateScope) {

                $rootScope.currentDate = aux.getDateFromUTC(dateScope.date);
                $rootScope.$apply();

            });

            if(!$rootScope.currentUser.role.check) {
                $rootScope.currentDate = aux.getDateFromUTC($('#patient-datepicker div').datepicker('getDate'));
            }

        }
    }
});

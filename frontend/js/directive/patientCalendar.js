
App.directive('calendar', function($rootScope, config, aux) {
    return {
        restrict: 'E',
        templateUrl: './templates/patientCalendar.html',
        link: function(scope, element, attrs) {
            if ($rootScope.currentUser.role.check) return false;

            $('#patient-datepicker div').datepicker({
                format: "yyyy-mm-dd",
                weekStart: 1,
                keyboardNavigation: false,
                startDate: $rootScope.dateMin,
                endDate: $rootScope.dateMax,
                language: config.lang
            }).
            datepicker('update', (function() {
                var dayMax = new Date($rootScope.dateMax || 0).getDay() + 1;
                var today = new Date().getDay() + 1;

                if (dayMax < today) return $rootScope.dateMax;

                return $rootScope.dateMax.replace(dayMax, today);
            })()).
            on('changeDate', function(dateScope) {
                $rootScope.currentDate = aux.getDateFromUTC(dateScope.date);
                $rootScope.$apply();
            });

            $rootScope.currentDate = aux.getDateFromUTC( $('#patient-datepicker div').datepicker('getDate') );
        }
    }
});

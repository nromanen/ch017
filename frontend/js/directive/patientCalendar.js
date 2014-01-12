
App.directive('calendar', function($rootScope, config, aux) {
    return {
        restrict: 'E',
        templateUrl: './templates/patientCalendar.html',
        link: function($scope, element, attrs) {
            if ($rootScope.currentUser.role.check) return false;

            $rootScope.$watch('lang', function() {
                $('#patient-datepicker div')
                .datepicker('remove')
                .datepicker({
                    format: "yyyy-mm-dd",
                    weekStart: 1,
                    keyboardNavigation: false,
                    startDate: $rootScope.dateLimit.min,
                    endDate: $rootScope.dateLimit.max,
                    language: $rootScope.lang || config.lang
                }).
                datepicker('update', (function() {
                    var dayMax = new Date($rootScope.dateLimit.max || 0).getDate();
                    var today = new Date().getDate();

                    if (dayMax < today) return $rootScope.dateLimit.max;

                    return $rootScope.dateLimit.max.replace(dayMax, today);
                })()).
                on('changeDate', function(dateScope) {
                    $rootScope.currentDate = aux.getDateFromUTC(dateScope.date);
                    $rootScope.$apply();
                });
            }, true);
        }
    }
});

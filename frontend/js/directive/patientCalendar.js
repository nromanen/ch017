
App.directive('calendar', function($rootScope, config, aux) {
    return {
        restrict: 'E',
        templateUrl: './templates/patientCalendar.html',
        link: function($scope, element, attrs) {
            if ($rootScope.currentUser.role.check) return false;

            var $calendar = $('.patient-calendar');

            $rootScope.$watch('lang', function() {
                $calendar
                .datepicker('remove')
                .datepicker({
                    format: "yyyy-mm-dd",
                    weekStart: 1,
                    keyboardNavigation: false,
                    todayBtn: 'linked',
                    startDate: $rootScope.dateLimit.min,
                    endDate: $rootScope.dateLimit.max,
                    language: $rootScope.lang || config.lang
                }).
                datepicker('update', (function() {
                    var dayMax = new Date($rootScope.dateLimit.max || 0).getDate();
                    var today = new Date().getDate();

                    if (dayMax < today) {
                        $rootScope.currentDate = $rootScope.dateLimit.max.replace(today, dayMax);
                        return $rootScope.dateLimit.max;
                    }

                    return $rootScope.dateLimit.max.replace(dayMax, today);
                })()).
                on('changeDate', function(dateScope) {
                    $calendar.datepicker('hide');
                    $rootScope.currentDate = aux.getDateFromUTC(dateScope.date);
                    $rootScope.$apply();
                });
            }, true);
        }
    }
});


App.directive('calendar', function($rootScope) {
    return {
        restrict: "E",
        templateUrl: './templates/patientCalendar.html',
        link: function(scope, element, attrs) {
            $('#patient-datepicker div').datepicker({
                format: "yyyy-mm-dd",
                weekStart: 1,
                keyboardNavigation: false,
                todayHighlight: true,
                startDate: $rootScope.dateMin,
                endDate: $rootScope.dateMax
            });
        }
    }
});


App.directive('topPanel', function($rootScope, aux) {
    return {
        restrict: "E",
        templateUrl: './templates/topPanel.html',
        link: function() {

            $.fn.datepicker.dates['en'].daysMin = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

            $('#datetimepicker3 input').datepicker({
                format: "yyyy-mm-dd",
                weekStart: 1,
                keyboardNavigation: false,
                autoclose: true,
                forceParse: true
            }).
            datepicker('update', (function() {
                var today = aux.getDateFromUTC(new Date());

                $rootScope.currentDate = today;

                return today;
            })()).
            on('changeDate', function(dateScope) {

                $rootScope.currentDate = aux.getDateFromUTC($('#datetimepicker3 input').datepicker('getDate'));
                $rootScope.$apply();

            });
        }
    }
});

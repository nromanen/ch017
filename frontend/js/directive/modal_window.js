App.directive('modal', function($rootScope, aux) {
    return {
        restrict: "E",
        templateUrl: './templates/modalWindow.html',
        link: function() {
/*
            $('#datetimepicker1 input').datepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                keyboardNavigation: false,
                autoclose: true
            }).
            datepicker('update', (function() {
                var today = aux.getDateFromUTC(new Date());
                $rootScope.date = today;

                return today;
            })());

            $('#datetimepicker2').datetimepicker({
                pickDate: false
            });
*/
            $rootScope.currentTime = aux.getTimeFromUTC(new Date());

        }
    }
});

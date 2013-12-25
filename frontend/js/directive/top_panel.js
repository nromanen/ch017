
App.directive('topPanel', function($rootScope, aux, config) {
    return {
        restrict: "E",
        templateUrl: './templates/topPanel.html',
        link: function() {

            $('#datetimepicker3 input').datepicker({
                format: "yyyy-mm-dd",
                weekStart: 1,
                keyboardNavigation: false,
                autoclose: true,
                forceParse: true,
                language: config.lang
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

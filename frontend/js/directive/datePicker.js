
App.directive('datePicker', function($rootScope, config, aux) {
    return {
        link: function($scope, element, attrs) {
            $(element).datepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                keyboardNavigation: false,
                autoclose: true,
                forceParse: true,
                language: $rootScope.lang || config.lang
            }).
            datepicker('update', aux.getDateFromUTC(new Date())).
            on('changeDate', function(dateScope) {
                $rootScope.currentDate = aux.getDateFromUTC(dateScope.date);
                $rootScope.$apply();
            });
        }
    };
});

App.directive('hidePicker', function() {
    return {
        link: function($scope, elm, attrs) {
           angular.element(".datepicker-days").on('click', '*', function () {
              angular.element(".bootstrap-datetimepicker-widget").hide();
           });
        }
    };
});
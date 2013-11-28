App.directive('hidePicker', function() {
    return {
        link: function($scope, elm, attrs) {
           angular.element(".table-condensed *").on('click', function () {
              angular.element(".bootstrap-datetimepicker-widget").hide();
           });
        }
    };
});
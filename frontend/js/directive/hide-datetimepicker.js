App.directive('hidePicker', function() {
    return {
        link: function($scope, elm, attrs) {
           angular.element(".table-condensed").on('click', '*', function () {
              if (angular.element(this).attr('class').indexOf('day') !== -1) {
                  angular.element(".bootstrap-datetimepicker-widget").hide();
              }
           });
        }
    };
});
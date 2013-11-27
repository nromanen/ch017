App.directive('hidePicker', function() {
    return {
        link: function($scope, elm, attrs) {
           elm.on('click', function () {
              alert("work")
              angular.element(".bootstrap-datetimepicker-widget").hide();
           });
        }
    };
});
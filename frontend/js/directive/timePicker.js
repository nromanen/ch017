
App.directive('timePicker', function() {

    this.init = (function() {
        $('#datetimepicker2').datetimepicker({
            pickDate: false,
            pickSeconds: false,
            maskInput: true
        });
    })();

    return {
        link: function($scope, element, attrs) {
            element.on('blur', function() {
                $scope.$apply(function() {
                   $scope.time = element.val();
                });

                $('#datetimepicker2').datetimepicker('hide');
            });

            element.on('focus', function() {
                $('#datetimepicker2').datetimepicker('show');
            });
        }
    };
});

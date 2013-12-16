App.directive('timePicker', function() {
    this.init = (function() {
        $('#datetimepicker2').datetimepicker({
            pickDate: false,
            pickSeconds: false,
            maskInput: true
        });
    })();

    return {
        link: function($scope, elm, attrs) {
            elm.on('blur', function () {
                $scope.$apply(function () {
                   $scope.time = elm.val();
                });
                $('#datetimepicker2').datetimepicker('hide');
            });

            elm.on('focus', function () {
                $('#datetimepicker2').datetimepicker('show');
            });
        }
    };
});
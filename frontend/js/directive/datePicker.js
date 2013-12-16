App.directive('datePicker', function() {
    this.init = (function() {
        $('#datetimepicker1').datetimepicker({
            pickTime: false,
            weekStart: 1,
            maskInput: true
        });
    })();

    return {
        link: function($scope, elm, attrs) {
            elm.on('blur', function () {
                $scope.$apply(function () {
                   $scope.date = elm.val();
                });
                $('#datetimepicker1').datetimepicker('hide');
            });

            elm.on('focus', function () {
                $('#datetimepicker1').datetimepicker('show');
            });
        }
    };
});
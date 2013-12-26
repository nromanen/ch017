
App.directive('datePicker', function() {

    this.init = (function() {
        $('#datetimepicker1').datetimepicker({
            pickTime: false,
            weekStart: 1,
            maskInput: true
        });
    })();

    return {
        link: function($scope, element, attrs) {
            element.on('blur', function() {
                $scope.$apply(function() {
                   $scope.date = element.val();
                });

                $('#datetimepicker1').datetimepicker('hide');
            });

            element.on('focus', function() {
                $('#datetimepicker1').datetimepicker('show');
            });
        }
    };

});

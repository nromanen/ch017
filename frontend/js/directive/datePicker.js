App.directive('datePicker', function() {
    return {
        link: function($scope, elm, attrs) {
           elm.on('blur', function () {
               $scope.$apply(function () {
                   $scope.date = elm.val();
               });
           });
        }
    };
});
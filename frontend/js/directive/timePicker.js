App.directive('timePicker', function() {
    return {
        link: function(scope, elm, attrs) {
           elm.on('blur', function () {
               scope.$apply(function () {
                   scope.time = elm.val();
               });
           });
        }
    };
});
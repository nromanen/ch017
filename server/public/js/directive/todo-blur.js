
App.directive('blur', function () {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('blur', function() {
                scope.$apply(attrs.blur);

                elem.parent().hide();
                elem.parent().prev('span').show();
            });
        }
    }
});

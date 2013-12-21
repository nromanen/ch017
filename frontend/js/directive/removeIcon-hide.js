
App.directive("mouseout", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind('mouseout', function () {
                scope.$apply(attrs.mouseout);
                elem.children(".remove-icon").hide();
            });
        }
    }
});


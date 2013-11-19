
App.directive("mouseover", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                elem.bind('mouseover', function () {
                    scope.$apply(attrs.mouseover);
                    if (scope.canRemoveTodo()) {
                        elem.children().last().children().show();
                    }
                });
            }
        }
    });


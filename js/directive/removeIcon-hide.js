angular.module("todo-mouseout", [])
    .directive("mouseout", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                elem.bind('mouseout', function () {
                    scope.$apply(attrs.mouseout);
                    if (scope.canRemoveTodo()) {
                        elem.children().last().children().hide();
                    }
                });
            }
        }
    });


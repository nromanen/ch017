angular.module("todo-click", [])
    .directive("click", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    scope.$apply(attrs.click);
                    elem.hide();
                    elem.next("form").show();
                });
            }
        }
    });

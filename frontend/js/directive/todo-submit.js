
App.directive("submit", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind('submit', function () {
                //get addTodo func from scope
                var addTodo = scope[attrs.submit];

                scope.$apply(attrs.blur);
                angular.element(".but_log").trigger("click");
                addTodo();
            });
        }
    }
});
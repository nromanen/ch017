
App.directive("mouseover", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind('mouseover', function () {
                scope.$apply(attrs.mouseover);
                if ((scope.canRemoveTodo(elem.children("span").attr("todo-item"),elem.children("span").attr("time-item")))&&
                    (!elem.children("input.left.check_done").prop("checked"))) {
                        elem.children(".remove-icon").show();
                }
            });
        }
    }
});


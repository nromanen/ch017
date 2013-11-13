angular.module("todo-click", [])
    .directive("dbclick", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                elem.bind('dblclick', function () {
                    scope.$apply(attrs.click);

                    if (scope.statusInSystem.rights.edit) {
                        angular.element(".todo_item").show();
                        angular.element(".edit-form").hide();
                        elem.hide();
                        elem.next("form").show().focus();
                    }
                });
            }
        }
    });

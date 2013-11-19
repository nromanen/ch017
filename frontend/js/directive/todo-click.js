
App.directive("click", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                scope.$apply(attrs.click);
                angular.element(".todo_item").show();
                angular.element(".edit-form").hide();
                elem.hide();
                elem.next("form").show().focus();
            });
        }
    }
});

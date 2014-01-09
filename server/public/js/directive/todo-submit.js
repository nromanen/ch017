
App.directive('submit', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('submit', function() {
                scope.$apply(attrs.blur);

                //get addTodo func from scope
                var addTodo = scope[attrs.submit];

                angular.element('.but_log').trigger('click');
                addTodo();
            });
        }
    }
});

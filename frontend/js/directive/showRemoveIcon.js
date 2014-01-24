
App.directive('mouseover', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.bind('mouseover', function () {
                $scope.$apply(attrs.mouseover);

                var canRemoveTodo = $scope.canRemoveTodo(
                    element.children('span').attr('todo-item'), 
                    element.children('span').attr('time-item')
                );

                if (canRemoveTodo && (!element.children('input.left.check_done').prop('checked'))) {
                    element.children('.remove-icon').show();
                }
            });
        }
    }
});
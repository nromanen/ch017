
App.directive('mouseout', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.bind('mouseout', function() {
                $scope.$apply(attrs.mouseout);
                element.children('.remove-icon').hide();
            });
        }
    }
});

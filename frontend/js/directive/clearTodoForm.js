
App.directive('clear', ['$rootScope', function($rootScope) {
    return {
        link: function($scope, element, attrs) {
            element.on('click', function() {

                $scope.$apply(function() {
                    $rootScope.todoExample = {
                        edit: false,
                        text: '',
                        time: []
                    };
                });

            });
        }
    };
}]);

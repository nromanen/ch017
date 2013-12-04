
App.directive('clear', ['$rootScope', function($rootScope) {
    return {
        link: function(scope, elm, attrs, ctrl) {
            elm.on('click', function() {
                scope.$apply(function() {
                    $rootScope.todoExample = {
                        edit: false,
                        text: '',
                        done: false,
                        time: []
                    };
                });
            });
        }
    };
}]);
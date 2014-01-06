
App.directive('login', function() {
    return function(scope, element) {
        element.attr('pattern', '^[a-zA-Z0-9-_\.]{3,}$');
    }
});


App.directive('password', function() {
    return function(scope, element) {
        element.attr('pattern', '[^]{4,}$');
    }
});

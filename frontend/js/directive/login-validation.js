/**
 * Created by csp on 11/21/13.
 */
App.directive('login', function () {
    return function (scope, elm) {
        elm.attr("pattern", "^[a-zA-Z][a-zA-Z0-9-_\.]{2,}$");
    }
});

/**
 * Created by csp on 11/21/13.
 */
App.directive('password', function () {
    return function (scope, elm) {
        elm.attr("pattern", "[^]{4,}$");
    }
});


App.factory("routeOnLoad", [
    "localStorageService",
    "$http",
    "$location",
    function (localStorageService, $http, $location) {

    var routeOnLoad = {};

    routeOnLoad.redirectTo = function(url) {
        $location.path( url );
    }

    routeOnLoad.getUserData = function() {

        if (localStorageService.get('userLogin') === null) {
            routeOnLoad.redirectTo('/auth');
            return false;
        }

        var statusInSystem = localStorageService.get('statusInSystem');
        var roleName = statusInSystem.role.name;
        var login = statusInSystem.login;

        routeOnLoad.redirectTo( '/' + roleName + '/' + login );

    }

    return routeOnLoad;
}]);

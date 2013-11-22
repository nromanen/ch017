
App.factory("routeOnLoad", [
    "localStorageService",
    "$http",
    "$location",
    function (localStorageService, $http, $location) {

    var routeOnLoad = {};

    routeOnLoad.saveStatusInSystem = function(data) {
        localStorageService.add("statusInSystem", data);
    }

    routeOnLoad.redirectTo = function(url) {
        $location.path( url );
    }

    routeOnLoad.getUserData = function() {

        if (localStorageService.get('userLogin') === null) {
            routeOnLoad.redirectTo('/auth');
            return false;
        }

        var login = localStorageService.get('userLogin');
        var host = 'http://localhost:6543';
        var url = host + '/get/user/' + login + '/?callback=JSON_CALLBACK';

        $http.jsonp(url).
        success(function(data, status) {

            /* *** I AM GETTING FROM DJANGO *** */
            /*
            if(login === false) return data = {"result":false};
            if(login === true) return data = {{Object with the role}};
            */

            if (data.result === false) {
                routeOnLoad.redirectTo('/auth');
                return false;
            }

            routeOnLoad.saveStatusInSystem(data);

            routeOnLoad.redirectTo( '/' + data.role.name + '/' + data.login );

        }).
        error(function(data, status) {
            routeOnLoad.redirectTo( '/error/' + status );
        });

    }

    return routeOnLoad;
}]);

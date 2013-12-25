
App.factory('routeOnLoad', [
    'localStorageService',
    '$http',
    '$location',
    function(localStorageService, $http, $location) {

        var routeOnLoad = {};

        routeOnLoad.redirectTo = function(url) {
            $location.path(url);
        };

        routeOnLoad.getUserData = function() {

            if (localStorageService.get('currentUser') === null) {
                routeOnLoad.redirectTo('/auth');
                return false;
            }

            var currentUser = localStorageService.get('currentUser');

            routeOnLoad.redirectTo( '/' + currentUser.role.name + '/' + currentUser.login );

        };

        return routeOnLoad;

    }
]);

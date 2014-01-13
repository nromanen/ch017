
App.factory('routeOnLoad', [
    '$http',
    '$location',
    'aux',
    'db',
    function($http, $location, aux, db) {

        var routeOnLoad = {};

        routeOnLoad.redirectTo = function(url) {
            $location.path(url);
        };

        routeOnLoad.getUserData = function() {

            if (aux.getFromLocalStorage('currentUser') === null) {
                routeOnLoad.redirectTo('/auth');
                return false;
            }

            var currentUser = aux.getFromLocalStorage('currentUser');

            if (currentUser.is_staff) db.getPatientList(currentUser);
        };

        return routeOnLoad;

    }
]);

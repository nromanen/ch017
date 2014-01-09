
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

            if (aux.getFromLocalStorage('remember_me') === 'false') {
                routeOnLoad.redirectTo('/auth/logout');
                return false;
            }

            if (aux.getFromLocalStorage('remember_me_temp') === 'true') {
                aux.addToLocalStorage('remember_me', 'true');
            } else aux.addToLocalStorage('remember_me', 'false');

            var currentUser = aux.getFromLocalStorage('currentUser');

            db.getPatientList(currentUser);
        };

        return routeOnLoad;

    }
]);

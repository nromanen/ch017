
App.factory("routeOnLoad", [
    "$rootScope",
    "localStorageService",
    "$http",
    "$location",
    "$q",
    "config",
    function ($rootScope, localStorageService, $http, $location, $q, config) {

    var routeOnLoad = {};

    routeOnLoad.redirectTo = function(url) {
        $location.path( url );
    }

    function makeRequest() {

        var deffered = $q.defer();
        var url = config.serverUrl + config.apiUrl + 'users_by_role/Patient/?callback=JSON_CALLBACK';

        $http.jsonp(url).
        success(function(data, status) {
            localStorageService.add('users', data);
            deffered.resolve(data);
        }).
        error(function(data, status) {
            deffered.reject("Error");
        });
        return deffered.promise;
    }

    function init() {

        $rootScope.users = localStorageService.get("users") || [];
        $rootScope.currentUser = localStorageService.get("currentUser");
        $rootScope.userPhoto = config.serverUrl + config.imagesPath + $rootScope.currentUser.foto;

        if (!$rootScope.currentUser.role.add && !$rootScope.currentUser.role.edit &&
            !$rootScope.currentUser.role.remove && !$rootScope.currentUser.role.check) {
            $rootScope.patientListHide = true;
            $rootScope.currentPatient = $rootScope.currentUser;
        } else {
            $rootScope.patientListHide = false;
            $rootScope.currentPatient = $rootScope.users[0];
        }
    }

    routeOnLoad.getUserData = function() {

        if (localStorageService.get('currentUser') === null) {
            routeOnLoad.redirectTo('/auth');
            return false;
        }

        var promise = makeRequest();
        
        promise.then(function(data) {
          var currentUser = localStorageService.get('currentUser');
          init();
          routeOnLoad.redirectTo( '/' + currentUser.role.name + '/' + currentUser.login );
        }, function(reason) {

        }, function(update) {

        });

    }

    return routeOnLoad;
}]);

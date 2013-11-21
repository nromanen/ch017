
App.factory("routeOnLoad", [
    "$rootScope",
    "localStorageService",
    "$http",
    "$location",
    function ($rootScope, localStorageService, $http, $location) {

    var routeOnLoad = {};

    routeOnLoad.saveStatusInSystem = function(data) {
        localStorageService.add("statusInSystem", data);
    }

    routeOnLoad.redirectTo = function(url) {
        $location.path( url );
    }

    routeOnLoad.getUserData = function() {
        $http({
            method: 'GET',
            url: 'backend/get-user.json',
            data: {'login': localStorageService.get('userLogin')}
        }).
        success(function(data, status, headers, config) {

			/* ***I NEED FROM SERVER***
			if(login === false) return data = {"result":false};
			if(login === true) return data = {"login":"VasyaPupkin","name":"Vasya Pupkin",
			"rights":{"add":false,"remove":false,"check":false,"edit":false}};
			*** */

            if (data.result === false) {
                routeOnLoad.redirectTo('/auth');
                return false;
            }

            routeOnLoad.saveStatusInSystem(data);

            routeOnLoad.redirectTo( '/' + data.type + '/' + data.login );
        }).
        error(function(data, status, headers, config) {
            routeOnLoad.redirectTo( '/error/' + status );
        });
    }

    return routeOnLoad;
}]);

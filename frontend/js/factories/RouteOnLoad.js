
App.factory("routeOnLoad", [
    "localStorageService",
    "$http",
    "$location",
    function (localStorageService, $http, $location) {

    var routeOnLoad = {};

    routeOnLoad.checkServerAnswer = function(status, result) {
        if (status !== 200) {
            routeOnLoad.redirectTo( '/error/' + status );
            return false;
        }

        if (result === false) {
            routeOnLoad.redirectTo('/auth');
            return false;
        }

        return true;
    }

    routeOnLoad.saveStatusInSystem = function(data) {
        routeOnLoad.statusInSystem = data; /* !!! Here we will need to save 'statusInSystem' in the $scope !!! */

        return true;
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
			if(login === true) return data = {"login":"IvanPupkin","name":"Ivan Pupkin",
			"rights":{"add":false,"remove":false,"check":false,"edit":false}};
			*** */

            if (routeOnLoad.checkServerAnswer(status, data.result) === false) return false;

            routeOnLoad.saveStatusInSystem(data);

            routeOnLoad.redirectTo( '/' + data.type + '/' + data.login );
        }).
        error(function(data, status, headers, config) {
            routeOnLoad.redirectTo( '/error/' + status );
        });

        return true;
    }

    return routeOnLoad;
}]);

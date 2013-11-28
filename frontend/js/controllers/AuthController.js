
App.controller("AuthController", function ($scope, $rootScope, localStorageService, $routeParams, $http, $location, config) {

    function init () {
        if($routeParams.param === 'logout') $scope.logout();
    }

    $scope.logout = function() {
        localStorageService.clearAll();

        $scope.redirectTo('/auth');

        return false;
    };

    $scope.hint = function(str) {
        $scope.hintText = str;
    };
    
    $scope.saveRole = function(data) {
        localStorageService.add('currentUser', data);
    }
    
    $scope.redirectTo = function(url) {
        $location.path( url );
    }

    $scope.sendData = function() {

        var login = $scope.authLogin;
        var password = btoa($scope.authPassword);
        var path = config.serverUrl + config.apiUrl;
        var url = path + 'user/' + login + '/' + password + '/?callback=JSON_CALLBACK';

        $scope.getUser(url);

    };

    $scope.getUser = function (url) {

        $http.jsonp(url).
            success(function(data, status) {

                if (data.result === false) {
                    $scope.hint(data.error);
                    return false;
                }

                $scope.saveRole(data);

                $scope.redirectTo( '/' + data.role.name + '/' + data.login );

            }).
            error(function(data, status) {
                $scope.hint(data.error);
            });
    }

    init();

});

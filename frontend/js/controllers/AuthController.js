
App.controller("AuthController", function ($scope, $rootScope, localStorageService, $routeParams, $http, $location, config) {

    function init () {
        if($routeParams.param === 'logout') $scope.logout();

        /* TEMP */
        $scope.authLogin = 'doctor';
        $scope.authPassword = '1111';
        /* TEMP */

        $rootScope.showTopPanel = false;
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
        localStorageService.add('userLogin', data.login);
        localStorageService.add('statusInSystem', data);
    }
    
    $scope.redirectTo = function(url) {
        $location.path( url );
    }

    $scope.sendData = function() {

        var login = $scope.authLogin;
        var password = btoa($scope.authPassword);
        var path = config.serverUrl + config.apiUrl;
        var url = path + 'user/' + login + '/' + password + '/?callback=JSON_CALLBACK';

        $http.jsonp(url).
        success(function(data, status) {

            /* *** I AM GETTING FROM DJANGO *** */
            /*
            if(login === false) {
                var data = {
                    "result":false,
                    "error":"You had entered an unknown login. Please, try again."
                };
            }
            if(login === true && password === false) {
                var data = {
                    "result":false,
                    "error":"You had entered unknown data. Please, try again."
                };
            }
            if(login === true && password === true) return data = {{Object with the role}};
            */

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

    };

    init();

});


App.controller("AuthController", function ($scope, localStorageService, $routeParams, $http, $location, $routeParams) {

        /* TEMP */
        $scope.authLogin = 'Doctor';
        $scope.authPassword = '1111';
        /* TEMP */

    function init () {
        if($routeParams.param === 'logout') $scope.logout();
    }

    $scope.logout = function() {
        localStorageService.add('userLogin', '');
        $scope.redirectTo('/auth');

        return false;
    };

    $scope.hint = function(str) {
                $scope.hintText = str;
    };
    
    $scope.saveRole = function(data) {
        localStorageService.add('userLogin', data.login);
        $scope.statusInSystem = data;
    }
    
    $scope.redirectTo = function(url) {
        $location.path( url );
    }

    $scope.sendData = function() {
        alert("here")
        var login = $scope.authLogin;
        var password = btoa($scope.authPassword);
        var host = 'http://127.0.0.1:8000';
        var url = host + '/api/users/?callback=JSON_CALLBACK';

        $http.jsonp(url).
        success(function(data, status) {
            console.log(data);
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

            //$scope.saveRole(data);

            //$scope.redirectTo( '/' + data.role.name + '/' + data.login );

        }).
        error(function(data, status) {
            $scope.hint(data.error);
        });

    };

    init();

});
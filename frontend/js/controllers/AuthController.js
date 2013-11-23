
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
        localStorageService.add('statusInSystem', '');
        localStorageService.add('todos_list', '');

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
        var host = 'http://localhost:8000';
        var url = host + '/api/user/' + login + '/' + password + '/?callback=JSON_CALLBACK';

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

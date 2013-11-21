
App.controller("AuthController", function ($scope, localStorageService, $routeParams, $http, $location) {

	/* TEMP */
	$scope.authLogin = 'VasyaPupkin';
	$scope.authPassword = '1111';
	/* TEMP */
    
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
        $http({
            method: 'GET', 
            url: 'backend/check-user.json', 
            data: 
            {
                'login': $scope.authLogin, 
                'password': $scope.authPassword, 
                'remember': $scope.authRemember || false
            }
        }).
        success(function(data, status, headers, config) {
            
			/* ***I NEED FROM SERVER***
			if(login === false) {
			    var data = {"result":false,"error":"You had entered an unknown login. Please, try again."};
			}
			if(login === true && password === false) {
			    var data = {"result":false,"error":"You had entered unknown data. Please, try again."};
			}
			if(login === true && password === true) {
			    var data = {
			        "login":"VasyaPupkin","name":"Vasya Pupkin","type"="patient",
			        "rights":{"add":false,"remove":false,"check":false,"edit":false}
			    };
			}
			*** */

            if (data.result === false) {
                $scope.hint(data.error);
                return false;
            }

            $scope.saveRole(data);

            $scope.redirectTo( '/' + data.type + '/' + data.login );
        }).
        error(function(data, status, headers, config) {
            $scope.hint(data.error);
        });
    };
});

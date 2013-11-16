function AuthController($scope, localStorageService, $routeParams, $http, $location) {

    var hintColors = {red: {color: '#CE2F2F'}, green: {color: '#259117'}};
    var AUTH_ERROR = {};
		AUTH_ERROR.SERVER = 'Sorry, there was an error at our server side. Please, try again later.';
		AUTH_ERROR.LOGIN = 'You had entered an unknown login. Please, try again.';
		AUTH_ERROR.PASSWORD = 'You had entered unknown data. Please, try again.';
    
	/* TEMP */
	$scope.authLogin = 'VasyaPupkin';
	$scope.authPassword = '1111';
	/* TEMP */
    
    $scope.hint = {
		show: function(str, color) {
			$scope.hintStyle = hintColors[ color ];
			$scope.hintText = str;
		},
		clear: function() {
			$scope.hintText = '';
		}
    };
    
    $scope.checkServerAnswer = function(status, data) {
        if (status !== 200) {
            $scope.hint.show( AUTH_ERROR.SERVER, 'red' );
            return false;
        }
        
        if (data.result === false && data.error === 1) {
            $scope.hint.show( AUTH_ERROR.LOGIN, 'red' );
            return false;
        }
        
        if (data.result === false && data.error === 2) {
            $scope.hint.show( AUTH_ERROR.PASSWORD, 'red' );
            return false;
        }
        
        return true;
    }
    
    $scope.saveRole = function(data) {
        localStorageService.add('userLogin', data.login);
        $scope.statusInSystem = data;
        
        return true;
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
			if(login === false) return data = {"result":false,"error":1};
			if(login === true && password === false) return data = {"result":false,"error":2};
			if(login === true && password === true) return data = {"login":"IvanPupkin","name":"Ivan Pupkin","rights":{"add":false,"remove":false,"check":false,"edit":false}};
			*** */
            
            $scope.hint.clear();
            
            if ($scope.checkServerAnswer(status, data) === false) return false;
            
            $scope.saveRole(data);
            
            $scope.redirectTo( '/' + data.type + '/' + data.login );
        }).
        error(function(data, status, headers, config) {
            $scope.hint.show( AUTH_ERROR.SERVER, 'red' );
        });
        
        return true;
    };
}

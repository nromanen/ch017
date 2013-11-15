function AuthController($scope, localStorageService, $routeParams, $http) {

    var hintColors = {red: {color: '#CE2F2F'}, green: {color: '#259117'}};
    var AUTH_ERROR = {};
		AUTH_ERROR.SERVER = "Sorry, there was an error at our server side. Please, try again later.";
		AUTH_ERROR.LOGIN = "You had entered an unknown login. Please, try again.";
		AUTH_ERROR.PASSWORD = "You had entered unknown data. Please, try again.";
    
	/* TEMP */
	$scope.authLogin = "test";
	$scope.authPassword = "1111";
	
    $scope.hint = {
		show: function(str, color) {
			$scope.hintStyle = hintColors[color];
			$scope.hintText = str;
		},
		clear: function() {
			$scope.hintText = '';
		}
    };
    
    $scope.checkUser = function() {
        $http({
            method: 'GET', 
            url: 'backend/check-user.json', 
            data: {'login': $scope.authLogin, 
                   'password': $scope.authPassword, 
                   'remember': $scope.authRemember}}).
        success(function(data, status, headers, config) {
			/****I NEED FROM SERVER***
			if(login === false) return data = {"result":false,"error":1};
			if(password === false) return data = {"result":false,"error":2};
			if(login === true && password === true) {"name":"Patient","rights":{"add":false,"remove":false,"check":false,"edit":false}}
			****/
            if(status !== 200) $scope.showHint( AUTH_ERROR.SERVER, 'red' );
            if(data.result === false && data.error === 1) {
				$scope.hint.show( AUTH_ERROR.LOGIN, 'red' );
				return false;
			}
			if(data.result === false && data.error === 2) {
				$scope.hint.show( AUTH_ERROR.PASSWORD, 'red' );
				return false;
			}
			$scope.hint.clear();
			//console.log(data);
			//localStorageService.add("userHash_client", data.hash);
			//$scope.userHash_local = data.hash;
			
            //$scope.showHint( 'Good job!', 'green' );
        }).
        error(function(data, status, headers, config) {
            $scope.showHint( ERROR_FROM_SERVER, 'red' );
        });
        
        return true;
    };
}

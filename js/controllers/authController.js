function authController($scope, localStorageService, $routeParams, $http) {
    var ERROR_FROM_SERVER = "Sorry, there was an error at our server side. Please, try again later.";
    var hintColors = {red: {color: '#CE2F2F'}, green: {color: '#259117'}};
    
    $scope.showHint = function(str, color) {
        $scope.hintStyle = hintColors[color];
        $scope.hint = str;
    }
    
    $scope.checkUser = function() {
        $http({
            method: 'GET', 
            url: 'backend/check-user.py', 
            data: {'login': $scope.authLogin, 
                   'password': $scope.authPassword, 
                   'remember': $scope.authRemember}}).
        success(function(data, status, headers, config) {
            if(status !== 200) $scope.showHint( ERROR_FROM_SERVER, 'red' );
            
            $scope.showHint( 'Good job!', 'green' );
        }).
        error(function(data, status, headers, config) {
            $scope.showHint( ERROR_FROM_SERVER, 'red' );
        });
        
        return true;
    }
}

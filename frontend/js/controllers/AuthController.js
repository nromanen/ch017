
App.controller("AuthController", function ($scope, $rootScope, localStorageService, $routeParams, $location, db) {

    function init () {
        if($routeParams.param === 'logout') $scope.logout();
    }

    $scope.logout = function() {
        localStorageService.clearAll();

        $scope.redirectTo('/auth');

        return false;
    };

    $scope.redirectTo = function(url) {
        $location.path( url );
    }

    $scope.sendData = function() {
        db.getUserData($scope.authLogin, $scope.authPassword);
    };

    init();

});

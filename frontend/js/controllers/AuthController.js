
App.controller("AuthController", function ($scope, $routeParams, db, aux) {

    function init () {
        if($routeParams.param === 'logout') $scope.logout();
    }

    $scope.logout = function() {
        aux.clearLocalStorage();

        aux.redirectTo('/auth');

        return false;
    };

    $scope.sendData = function() {
        db.getUserData($scope.authLogin, $scope.authPassword);
    };

    init();

});

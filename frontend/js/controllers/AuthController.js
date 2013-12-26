
App.controller('AuthController', function($scope, $rootScope, $routeParams, db, aux) {

    function init() {
        $scope.authRemember = true;
        $rootScope.topPanelHider = true;
        
        if ($routeParams.param === 'logout') $scope.logout();
    }

    $scope.logout = function() {
        aux.clearLocalStorage();

        aux.redirectTo('/auth');

        return false;
    };

    $scope.submit = function() {
        aux.addToLocalStorage('remember_me_temp', $scope.authRemember);
        db.getUserData($scope.authLogin, $scope.authPassword);
    };

    init();

});


App.controller('AuthController', function($scope, $rootScope, $routeParams, db, aux) {

    function init() {
        $rootScope.topPanelHider = true;
        
        if ($routeParams.param === 'logout') $scope.logout();
    }

    $scope.logout = function() {
        aux.clearLocalStorage();

        aux.redirectTo('/auth');

        return false;
    };

    $scope.submit = function() {
        aux.showHint('hintText', '');
        db.getUserData($scope.authLogin, $scope.authPassword);
    };

    $scope.clearMessage = function() {

        aux.showHint('hintText', '');

    };

    init();

});

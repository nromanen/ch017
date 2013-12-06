
App.controller("TopPanelController", function ($rootScope, $scope) {

    $rootScope.currentDate = '2013-12-10';

    $scope.getDate = function(){
       $rootScope.currentDate = document.getElementById('testid').value
    }

});

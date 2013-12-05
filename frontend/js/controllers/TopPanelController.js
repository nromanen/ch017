
App.controller("TopPanelController", function ($rootScope, $scope) {

    $rootScope.currentDate = '2013-12-04'

    $scope.getDate = function(){
       $rootScope.currentDate = document.getElementById('testid').value
    }

});

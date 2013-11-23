
App.controller("TopPanelController", function ($scope, localStorageService) {

    var statusInSystem = localStorageService.get("statusInSystem");

    $scope.currentUser = statusInSystem.first_name + ' ' + statusInSystem.last_name;

});

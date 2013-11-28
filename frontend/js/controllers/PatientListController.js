
App.controller("PatientListController", function (localStorageService, $scope, $http, config) {

    $scope.getPatients = (function() {

        var url = config.serverUrl + config.apiUrl + 'users_by_role/Patient/?callback=JSON_CALLBACK';

        var currentUser = localStorageService.get('currentUser');
        if (currentUser.role.check) {
            $http.jsonp(url).
            success(function(data, status) {
                $scope.patientList = data;
                localStorageService.add('users', data);
            }).
            error(function(data, status) {
                console.log('error');
            });
        }
    })();
});

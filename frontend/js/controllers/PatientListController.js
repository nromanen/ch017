
App.controller("PatientListController", function ($scope, $http, config) {
return false;
    $scope.getPatients = (function() {

        var url = config.serverUrl + config.apiUrl + 'users_by_role/patient/?callback=JSON_CALLBACK';

        $http.jsonp(url).
        success(function(data, status) {

            /* *** I AM GETTING FROM DJANGO *** */
            /*
            data = {{An array of objects only with patients}};
            */

            $scope.patientList = data;

        }).
        error(function(data, status) {
            console.log('error');
        });

    })();

    $scope.getActivePatient = function () {
        $scope.currentPatient = this.patient.first_name + ' ' + this.patient.last_name;
    }
});

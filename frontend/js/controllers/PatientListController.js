
App.controller('PatientListController', function($scope, $rootScope) {

    function getPatientFromUserScope(patientId) {
        var activeUser = $rootScope.users.filter(function(user) {
            return user.id === patientId;
        });

        return activeUser[0];
    }

    $scope.setActivePatient = function(patientId) {
        $rootScope.currentPatient = getPatientFromUserScope(patientId);
    };

});

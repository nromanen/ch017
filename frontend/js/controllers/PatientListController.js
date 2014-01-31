
App.controller('PatientListController', function($scope, $rootScope, $filter, localStorageService) {

	init();

	function init() {
		$scope.buttonState = false;
        $rootScope.calendarVisibility = true;
	}

    function getPatientFromUserScope(patientId) {
        var activeUser = $rootScope.users.filter(function(user) {
            return user.id === patientId;
        });

        return activeUser[0];
    }

    $scope.setActivePatient = function(patientId) {
        $rootScope.currentPatient = getPatientFromUserScope(patientId);
    };

    $scope.showOnlyTodaysPatient = function() {
        if ($filter('filter')($rootScope.patientList, $rootScope.currentDate).length === 0) return;

    	$scope.setActivePatient($rootScope.patientList[0].id);

    	if (!$scope.buttonState) {
    		$scope.buttonState = true;
            $rootScope.calendarVisibility = false;
    		$rootScope.patientList = $filter('filter')($rootScope.patientList, $rootScope.currentDate);
    	} else {
    		$scope.buttonState = false;
            $rootScope.calendarVisibility = true;
    		$rootScope.patientList = localStorageService.get('users');
    		
    	}
    };

});


App.controller('PatientCalendarController', function($scope, $rootScope) {

    function init() {
        var dates = $scope.getDates();

        if(dates.length === 0) return false;

        $rootScope.dateLimit = $scope.getDateLimit( $scope.sortDates( dates ) );
    }

    $scope.getDates = function() {
        var todoIndex = 0
        var timeIndex = 0
        var todo = $scope.currentPatient.todo;

        $scope.allDates = [];

        for (todoIndex; todoIndex < todo.length; todoIndex++) {
            for (timeIndex; timeIndex < todo[ todoIndex ].time.length; timeIndex++) {
                $scope.allDates.push( todo[ todoIndex ].time[ timeIndex ].date );
            }
        }

        return $scope.allDates;
    };

    $scope.sortDates = function(datesArray) {
        return datesArray.sort();
    };

    $scope.getDateLimit = function(sortedDatesArray) {
        return {
            min: sortedDatesArray[0], 
            max: sortedDatesArray[ sortedDatesArray.length - 1 ]
        };
    };

    init();

});

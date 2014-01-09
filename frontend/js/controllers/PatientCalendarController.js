
App.controller('PatientCalendarController', function($scope, $rootScope) {

    function init() {

        var dates = $scope.getDates();

        if(dates.length === 0) return false;

        var dateLimit = $scope.getDateLimit( $scope.sortDates( dates ) );

        $rootScope.dateMin = $scope.parseDate( dateLimit.min );
        $rootScope.dateMax = $scope.parseDate( dateLimit.max );

    }

    $scope.getDates = function() {
        $scope.allDates = [];

        for (var i = 0; i < $scope.currentPatient.todo.length; i++) {
            for (var j = 0; j < $scope.currentPatient.todo[i].time.length; j++) {
                $scope.allDates.push( $scope.currentPatient.todo[i].time[j].date );
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

    $scope.parseDate = function(dateStr) {
        return dateStr.substring(0, 10);
    };

    init();

});

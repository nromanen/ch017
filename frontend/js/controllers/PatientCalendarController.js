
App.controller('PatientCalendarController', function($scope, $rootScope, aux) {

    init();

    function init() {
        var dates = getDates($scope.currentPatient.todo);

        if (dates.length === 0) dates.push( aux.getDateFromUTC(new Date()) );

        $rootScope.dateLimit = getDateLimit( sortDates(dates) );
    }

    function getDates(todo) {
        var allDates = [];

        todo.forEach(function(todoObject) {
            todoObject.time.forEach(function(timeObject) {
                allDates.push( timeObject.date );
            });
        });

        return allDates;
    }

    function sortDates(datesArray) {
        return datesArray.sort();
    }

    function getDateLimit(sortedDatesArray) {
        return {
            min: sortedDatesArray[0],
            max: sortedDatesArray[ sortedDatesArray.length - 1 ]
        };
    }

});

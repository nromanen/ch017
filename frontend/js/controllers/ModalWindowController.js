
App.controller("ModalWindowController", function ($scope, aux, db, $rootScope) {

    init();

    function init() {

        $scope.date = aux.getDateFromUTC(new Date());
        $scope.time = aux.getTimeFromUTC(new Date());

        db.getMedicines();

    }

    $scope.addNewDateTimeToTodo = function() {
        $rootScope.todoExample.time.push( {time: $scope.time, date: $scope.date} );
    };

});

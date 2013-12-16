
App.controller("ModalWindowController", function ($scope, aux, db) {

    init();

    function init() {

        $scope.date = aux.getDateFromUTC(new Date());
        $scope.time = aux.getTimeFromUTC(new Date());

        db.getMedicines();

    }

});

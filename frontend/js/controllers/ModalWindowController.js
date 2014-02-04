App.controller('ModalWindowController', function($scope, $rootScope, db, aux) {

    function init() {
        $scope.daysCount = 1;
        $scope.period = 0;
        $rootScope.timeArr = [];
        $rootScope.dateArr = [];
        $scope.date = aux.getDateFromUTC(new Date());
        $scope.time = aux.getTimeFromUTC(new Date());
        $scope.todayDateForCheck = aux.getDateFromUTC(new Date());

        if ($rootScope.currentUser.is_doctor) db.getMedicines();
    }

    $scope.setTimeModal = function() {
        $rootScope.timeArr.push($scope.time);
    };

    $scope.pushValidDate = function() {
        if ($scope.period < 0) return;

        $scope.startDate = new Date($rootScope.currentDate);

        for (var i = 0; i < $scope.daysCount; i++) {
            var todayDay = $scope.startDate.getDate();
            var finallyDate = aux.getDateFromUTC($scope.startDate);

            $scope.period = parseInt($scope.period, 10);
            $scope.startDate.setDate(todayDay + $scope.period + 1);

            if (finallyDate >= $scope.todayDateForCheck) {
                $rootScope.dateArr.push(finallyDate);
            }
        }

        $scope.daysCount = 1;
        $scope.period = 0;
    };

    $scope.addTodoExample = function() {
        $scope.todoExample.time = [];

        for (var timeIndex = 0; timeIndex < $rootScope.timeArr.length; timeIndex++) {
            for (var dateIndex = 0; dateIndex < $rootScope.dateArr.length; dateIndex++) {
                var fullDate = {
                    time: $rootScope.timeArr[timeIndex],
                    date: $rootScope.dateArr[dateIndex],
                    done: false
                };
                $scope.todoExample.time.push(fullDate);
            }
        }

        $rootScope.dateArr = [];
        $rootScope.timeArr = [];
    };

    $scope.removeTimeTodo = function(index) {
        $rootScope.timeArr.splice(index, 1);
    };

    $scope.removeDateTodo = function(index) {
        $rootScope.dateArr.splice(index, 1);
    };

    init();

});
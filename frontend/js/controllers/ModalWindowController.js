App.controller('ModalWindowController', function($scope, $rootScope, db, aux) {

    function init() {
        $scope.period = 0;
        $scope.daysCount = 1;
        $scope.timeArr = [];
        $scope.dateArr = [];
        $scope.date = aux.getDateFromUTC(new Date());
        $scope.time = aux.getTimeFromUTC(new Date());

        $scope.getStartDate();

        db.getMedicines();

    }

    $scope.setTimeModal = function(){
        $scope.timeArr.push($scope.time)
    };

    $scope.getStartDate = function (){
        $scope.startDate = new Date($scope.date);

        var year = null;
        var month = null;
        var day = null;
        var finalyDate = null;
        var todayDay = null;
        var fullDate = null;

        for (var i = 0; i < $scope.daysCount; i++) {
            month = $scope.startDate.getMonth() + 1;
            day = $scope.startDate.getDate();
            year = $scope.startDate.getFullYear();

            todayDay = $scope.startDate.getDate();
            finalyDate = [year, month, day].join('-');
            $scope.dateArr.push(finalyDate);

            $scope.period = parseInt($scope.period, 10);
            $scope.startDate.setDate(todayDay + $scope.period + 1);
        }
    };

    $scope.addTodoExample = function() {


        for (var timeIndex = 0; timeIndex < $scope.timeArr.length; timeIndex++) {
            for (var dateIndex = 0; dateIndex < $scope.dateArr.length; dateIndex++) {
                fullDate = {
                    time: $scope.timeArr[timeIndex],
                    date: $scope.dateArr[dateIndex],
                    done: false
                };
                $scope.todoExample.time.push(fullDate);
            }
        }
        $scope.dateArr = [];
    };

    $scope.removeTimeTodo = function(index){
        $scope.timeArr.splice(index, 1);
    };

    $scope.removeDateTodo = function(index){
        $scope.dateArr.splice(index, 1);
    };

    init();

});

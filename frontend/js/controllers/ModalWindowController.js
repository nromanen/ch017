
App.controller("ModalWindowController", function ($scope, aux, db, $rootScope) {

    init();

    function init() {
        $scope.period = 0;
        $scope.daysCount = 1;
        $scope.timeArr = [];
        $scope.dateArr = [];
        $scope.date = aux.getDateFromUTC(new Date());
        $scope.time = aux.getTimeFromUTC(new Date());

        db.getMedicines();

    }

    $scope.setTimeModal = function(){
        $scope.timeArr.push($scope.time)
    }

    $scope.getStartDate = function (){
        $scope.startDate = new Date($scope.date);
    }

    $scope.getStartDate();

    $scope.addTodoExample = function() {
        for (i = 0; i < $scope.daysCount; i++){
    $scope.todayDay = $scope.startDate.getDate();
    $scope.period = parseInt($scope.period, 10);
    $scope.startDate.setDate($scope.todayDay + $scope.period);
    var month = $scope.startDate.getMonth()+1;
    var day = $scope.startDate.getDate();
    var year = $scope.startDate.getFullYear();
    $scope.finalyDate = year + '-' + month  + '-' + day
    $scope.dateArr.push($scope.finalyDate);
        }

        for ( k =0; k < $scope.timeArr.length; k++){
            for (j = 0; j < $scope.dateArr.length; j++){
                $scope.fullDate = {time: $scope.timeArr[k], date:$scope.dateArr[j]};
                $scope.todoExample.time.push($scope.fullDate);
            }
        }
    }

    $scope.removeDateTimeTodo = function(index){
        $scope.timeArr.splice(index, 1);
    }

});

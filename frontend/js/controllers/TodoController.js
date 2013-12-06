
App.controller("TodoController", function ($scope, $rootScope, localStorageService, config, db) {

    // this variable uses for edit todos and here will be new todo_item before save
    $rootScope.todoExample = {
        edit: false,
        text: '',
        done: false,
        time: []
    };

    init();

    function init() {
        $scope.sortedTodoList=[];
        $scope.users = localStorageService.get("users") || [];
        $rootScope.currentUser = localStorageService.get("currentUser");
        $rootScope.userPhoto = config.serverUrl + config.imagesPath + $scope.currentUser.foto;

        if (!$scope.currentUser.role.add && !$scope.currentUser.role.edit &&
            !$scope.currentUser.role.remove && !$scope.currentUser.role.check) {
            $scope.patientListHide = true;
            $scope.currentPatient = $scope.currentUser;
        } else {
            $scope.patientListHide = false;
            $scope.currentPatient = $scope.users[0];
        }
    }

    function clearTodoExamle () {
        $rootScope.todoExample = {
            edit: false,
            text: '',
            done: false,
            time: []
        };
    }

    function getPatientFromUsers(patientId) {

        var activeUser = $scope.users.filter(function (user) {
            return user.id === patientId;
        });
        return activeUser[0];

    }

    function updatePatientFromUsers(patientId) {
        $scope.users.forEach(function (user, index) {
            if (user.id === patientId) {
                $scope.users[index] = $scope.currentPatient;
            }
        });
    }

    //function update data in local storage after each change
    $scope.updateLocalStorage = function() {
        updatePatientFromUsers($scope.currentPatient.id);
        localStorageService.add('users', $scope.users);
    }

    $scope.addNewTodo = function() {
        if (!$rootScope.todoExample.text) return false;

        $scope.currentPatient.todo.push($rootScope.todoExample);
        db.addTodo($scope.currentPatient.id, $rootScope.todoExample);
        clearTodoExamle();
    };

    $scope.updateTodo = function () {

        $scope.currentPatient.todo.forEach(function (todo, index) {
            if (todo.id === $rootScope.todoExample.id) {
                $scope.currentPatient.todo[index] = $rootScope.todoExample;
                db.editTodo($rootScope.todoExample);
            }
        });
    };

    $scope.addNewDateTimeToTodo = function () {
        $rootScope.todoExample.time.push({time: [$scope.date, $scope.time].join(' ')})
    };

    $scope.removeDateTimeTodo = function(index){
        $rootScope.todoExample.time.splice(index, 1);
    }

    //check rules
    $scope.canAddTodo = function () {
        return $scope.currentUser.role.add;
    };

    $scope.canEditTodo = function () {
        return $scope.currentUser.role.edit;
    };

    $scope.canRemoveTodo = function () {
        return $scope.currentUser.role.remove;
    };

    $scope.canCheckTodo = function () {
        return $scope.currentUser.role.check;
    };

    $scope.setActivePatient = function( patientId ) {
        $scope.currentPatient = getPatientFromUsers(patientId);
        $scope.getAllTodosWithTodayDate();
    }

        $scope.getActiveTaskQuantity = function() {
            var count = 0;
            if(!$scope.sortedTodoList.length) return 0;
            $scope.sortedTodoList.forEach(function(todo) {

              //  $filter('byTime')($scope.sortedTodoList, $scope.currentDate)
                count += todo.time.filter(function(time) {
                    console.log(time)
                    return !time.done;
                }).length;
            });
            return count;
        };


    $scope.clearDoneTodos = function() {
        $scope.sortedTodoList.forEach(function(todo, index) {
            if (todo.done) {
                db.deleteTodo($scope.currentPatient.todo[index].id);
                $scope.currentPatient.todo.splice(index, 1);
                $scope.removeTodo()
            }
        });
    };

    $scope.removeTodo = function(index) {
        for (i = 0; i < $scope.currentPatient.todo.length; i++ ){
            if ($scope.sortedTodoList[index].id === $scope.currentPatient.todo[i].id && $scope.currentPatient.todo[i].time.length === 1){
                db.deleteTodo($scope.currentPatient.todo[i].id);
                $scope.currentPatient.todo.splice(i, 1);
                alert(1)
            }else{
                for (k = 0; k < $scope.currentPatient.todo[i].time.length; k++){
                    if ($scope.sortedTodoList[index].id === $scope.currentPatient.todo[i].id && $scope.currentPatient.todo[i].time[k].time.substring(0,10) === $rootScope.currentDate){
                        $scope.currentPatient.todo[i].time.splice(k,1);
                        //delete time from db
                    }
                }
            }
        }
        $scope.sortedTodoList.splice(index, 1);
    }

    $scope.getAllTodosWithTodayDate = function(){
        $scope.sortedTodoList = [];
        for ( i = 0; i < $scope.currentPatient.todo.length; i++ ){
            for (z = 0; z < $scope.currentPatient.todo[i].time.length; z++){
                $scope.currentPatient.todo[i].time[z].done = false;
                if ($scope.currentPatient.todo[i].time.length >= z && $scope.currentPatient.todo[i].time[z].time.substring(0,10) === $rootScope.currentDate){
                    $scope.sortedTodoList.push($scope.currentPatient.todo[i]);
                }
            }

        }
       // console.log($scope.sortedTodoList.time);
    }

});

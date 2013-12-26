App.controller('TodoController', function($scope, $rootScope, localStorageService, config, db) {

    // this variable uses for edit todos and here will be new todo_item before save
    $rootScope.todoExample = {
        edit: false,
        text: '',
        done: false,
        time: []
    };
    $scope.todoToRemove = [];

    init();

    function init() {
        $scope.users = localStorageService.get('users') || [];
        $rootScope.currentUser = localStorageService.get('currentUser');
        $rootScope.userPhoto = config.serverUrl + config.imagesPath + $scope.currentUser.foto;

        $rootScope.topPanelHider = false;

        if (!$scope.currentUser.role.add && !$scope.currentUser.role.edit &&
            !$scope.currentUser.role.remove && !$scope.currentUser.role.check) {
            $scope.patientListHide = true;
            $rootScope.currentPatient = $scope.currentUser;
        } else {
            $scope.patientListHide = false;
            $rootScope.currentPatient = $scope.users[0];
        }
    }

    function clearTodoExamle() {
        $rootScope.todoExample = {
            edit: false,
            text: '',
            done: false,
            time: []
        };
    }

    function getPatientFromUsers(patientId) {

        var activeUser = $scope.users.filter(function(user) {
            return user.id === patientId;
        });
        return activeUser[0];
    }

    function updatePatientFromUsers(patientId) {
        $scope.users.forEach(function(user, index) {
            if (user.id === patientId) {
                $scope.users[index] = $rootScope.currentPatient;
            }
        });
    }

    //function update data in local storage after each change
    $scope.updateLocalStorage = function() {
        updatePatientFromUsers($rootScope.currentPatient.id);
        localStorageService.add('users', $scope.users);
    };

    $scope.addNewTodo = function() {
        if (!$rootScope.todoExample.text) return false;

        db.addTodo($rootScope.currentPatient.todo, $rootScope.currentPatient.id, $rootScope.todoExample);
        clearTodoExamle();
    };

    $scope.updateTodo = function() {
        $rootScope.currentPatient.todo.forEach(function (todo, index) {
            if (todo.id !== $rootScope.todoExample.id) return false;

            $rootScope.currentPatient.todo[index] = $rootScope.todoExample;
            db.editTodo($rootScope.todoExample);
        });
    };

    $scope.getTodoAmount = function() {
        var amount = 0;

        for (var index = 0; index < $rootScope.currentPatient.todo.length; index++) {
            amount += $rootScope.currentPatient.todo[index].time.filter(function(time) {
                return time.date.split('-').reverse()[0] === $scope.currentDate.split('-').reverse()[0] && !time.done;
            }).length;
        }
        return amount;
    };


    function getTimeById(todoID, timeID) {
        for (var index = 0; index < $rootScope.currentPatient.todo.length; index++) {
            if ($rootScope.currentPatient.todo[index].id==todoID){
                for (var i = 0; i < $rootScope.currentPatient.todo[index].time.length; i++) {
                    if ($rootScope.currentPatient.todo[index].time[i].id == timeID) {
                        return $rootScope.currentPatient.todo[index].time[i].date;
                    }
                }
            }
        }
        return 0;
    }

    //check rules
    $scope.canAddTodo = function() {
        return $scope.currentUser.role.add;
    };

    $scope.canEditTodo = function() {
        return $scope.currentUser.role.edit;
    };

    $scope.canRemoveTodo = function(todoID, timeID) {
        var can = true;
        var current_date = new Date();
        if (($scope.currentUser.role.remove) && (todoID != undefined)) {
            var tododate = new Date(getTimeById(todoID,timeID));
            can = (current_date.getDate() <= tododate.getDate()) &&
                (current_date.getMonth() <= tododate.getMonth()) &&
                (current_date.getYear() <= tododate.getYear());
            }
        return can;
    };

    $scope.canCheckTodo = function(date,time) {
       var can = true;
       var current_date = new Date();
       var todo_date = new Date(date);
       if ($scope.currentUser.role.check) {
            can = (current_date.getDate() == todo_date.getDate()) &&
                  (current_date.getMonth() == todo_date.getMonth()) &&
                  (current_date.getYear() == todo_date.getYear());
        }
        return can;
    };

    $scope.setActivePatient = function(patientId) {
        $rootScope.currentPatient = getPatientFromUsers(patientId);
    };

    $scope.getActiveTaskQuantity = function() {
        var count = 0;

        if (!$rootScope.currentPatient.todo.length) return 0;

        $rootScope.currentPatient.todo.forEach(function(todo) {
            if (!todo.done) {
                ++count;
            }
        });

        return count;
    };

    $scope.prepareToRemove = function(todo, time) {
        if (time.done) {
            $scope.todoToRemove.push({todo: todo.id, time: time.id});
        } else {
            var index = $scope.todoToRemove.indexOf({todo: todo.id, time: time.id});
            $scope.todoToRemove.splice(index, 1);
        }

        db.editTodo(todo);
    };

    $scope.removeTodo = function(todo, time) {
        var todoItem = $.grep($rootScope.currentPatient.todo, function(todoItem) {
            return todoItem.id === todo;
        })[0];

        todoItem.time.forEach(function(timeItem, index) {
            if (timeItem.id === time) {
                todoItem.time.splice(index, 1);
            }
        });

        db.deleteTodo(time);
    };

});

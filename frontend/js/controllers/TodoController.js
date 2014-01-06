App.controller('TodoController', function($scope, $rootScope, localStorageService, config, db, aux) {

    // this variable uses for edit todos and here will be new todo_item before save
    $rootScope.todoExample = {
        edit: false,
        text: '',
        time: []
    };

    init();

    function init() {
        $scope.users = localStorageService.get('users') || [];
        $rootScope.currentUser = localStorageService.get('currentUser');
        $rootScope.userPhoto = config.mediaUrl + $scope.currentUser.foto;
        $rootScope.currentDate = aux.getDateFromUTC(new Date());
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
            time: []
        };
    }

    function getPatientFromUserScope(patientId) {

        var activeUser = $scope.users.filter(function(user) {
            return user.id === patientId;
        });
        return activeUser[0];
    }

    function putUpdatedPatientInUserScope(patientId) {
        $scope.users.forEach(function(user, index) {
            if (user.id === patientId) {
                $scope.users[index] = $rootScope.currentPatient;
            }
        });
    }

    $scope.updateUserScope = function() {
        putUpdatedPatientInUserScope($rootScope.currentPatient.id);
        localStorageService.add('users', $scope.users);
    };

    $scope.addNewTodo = function() {
        if (!$rootScope.todoExample.text) return false;

        db.addTodo($rootScope.currentPatient.id, $rootScope.todoExample);
        clearTodoExamle();
    };

    $scope.updateTodo = function() {
        $rootScope.currentPatient.todo.forEach(function(todo, index) {
            if (todo.id !== $rootScope.todoExample.id) return false;

            $rootScope.currentPatient.todo[index] = $rootScope.todoExample;
            db.editTodo($rootScope.todoExample, $rootScope.todoExample.id);
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

    $scope.canAddTodo = function() {
        return $scope.currentUser.role.add;
    };

    $scope.canEditTodo = function(todoID, timeID) {
        var can = true;
        var current_date = new Date();

        if (($scope.currentUser.role.edit) && (todoID !== undefined)) {
            var tododate = new Date(getTimeById(todoID, timeID));

            can = (current_date.getDate() <= tododate.getDate()) &&
                  (current_date.getMonth() <= tododate.getMonth()) &&
                  (current_date.getYear() <= tododate.getYear());
            return can;
        }

        return can;
    };

    $scope.canRemoveTodo = function(todoID, timeID) {
        if ($scope.currentUser.role.remove === false) return false;

        var can = true;
        var current_date = new Date();

        if (($scope.currentUser.role.remove) && (todoID !== undefined)) {
            var tododate = new Date(getTimeById(todoID, timeID));

            can = (current_date.getDate() <= tododate.getDate()) &&
                  (current_date.getMonth() <= tododate.getMonth()) &&
                  (current_date.getYear() <= tododate.getYear());
        }

        return can;
    };

    $scope.canCheckTodo = function(date, time) {
        if ($scope.currentUser.role.check === false) return false;

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
        $rootScope.currentPatient = getPatientFromUserScope(patientId);
    };

    $scope.prepareToRemove = function(todo) {
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

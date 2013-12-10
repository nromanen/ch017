App.controller("TodoController", function ($scope, $rootScope, localStorageService, config, db) {

    // this variable uses for edit todos and here will be new todo_item before save
    $rootScope.todoExample = {
        edit: false,
        text: '',
        done: false,
        time: []
    };
    $scope.todoToRemove = [];
    $scope.activeTodoAmount = 0

    init();

    function init() {

        $scope.users = localStorageService.get("users") || [];
        $rootScope.currentUser = localStorageService.get("currentUser");
        $rootScope.userPhoto = config.serverUrl + config.imagesPath + $scope.currentUser.foto;

        $rootScope.topPanelHider = false;

        if (!$scope.currentUser.role.add && !$scope.currentUser.role.edit &&
            !$scope.currentUser.role.remove && !$scope.currentUser.role.check) {
            $scope.patientListHide = true;
            $scope.currentPatient = $scope.currentUser;
        } else {
            $scope.patientListHide = false;
            $scope.currentPatient = $scope.users[0];
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

    $scope.updateTodo = function() {
        $scope.currentPatient.todo.forEach(function (todo, index) {
            if (todo.id !== $rootScope.todoExample.id) return false;

            $scope.currentPatient.todo[index] = $rootScope.todoExample;
            db.editTodo($rootScope.todoExample);
        });
    };

    $scope.getTodoAmount = function(index) {
        $scope.activeTodoAmount = index;
    };

    $scope.addNewDateTimeToTodo = function() {
        $rootScope.todoExample.time.push( {time: [$scope.date, $scope.time].join(' ')} )
    };

    $scope.removeDateTimeTodo = function(index){
        $rootScope.todoExample.time.splice(index, 1);
    }

    //check rules
    $scope.canAddTodo = function() {
        return $scope.currentUser.role.add;
    };

    $scope.canEditTodo = function() {
        return $scope.currentUser.role.edit;
    };

    $scope.canRemoveTodo = function() {
        return $scope.currentUser.role.remove;
    };

    $scope.canCheckTodo = function() {
        return $scope.currentUser.role.check;
    };

    $scope.setActivePatient = function(patientId) {
        $scope.currentPatient = getPatientFromUsers(patientId);
    }

    $scope.getActiveTaskQuantity = function() {
        var count = 0;

        if(!$scope.currentPatient.todo.length) return 0;

        $scope.currentPatient.todo.forEach(function(todo) {
            if (!todo.done) {
                ++count;
            }
        });

        return count;
    };

    $scope.clearDoneTodos = function() {
        $scope.todoToRemove.forEach(function(todo, index) {
            var todoItem = $.grep($scope.currentPatient.todo, function(todoItem) {
                return todoItem.id === todo.todo;
            })[0];
            todoItem.time.forEach(function(timeItem, index) {
                if (timeItem.id === todo.time) {
                    todoItem.time.splice(index, 1);
                    db.deleteTodo(todo.time);
                }
            });
        });
    };

    $scope.prepareToRemove = function(todo, time) {
        if (time.done) {
            $scope.todoToRemove.push({todo: todo.id, time: time.id});
        } else {
            var index = $scope.todoToRemove.indexOf({todo: todo.id, time: time.id});
            $scope.todoToRemove.splice(index, 1);
        }
    };

    $scope.removeTodo = function(todo, time) {
        var todoItem = $.grep($scope.currentPatient.todo, function(todoItem) {
            return todoItem.id === todo;
        })[0];

        todoItem.time.forEach(function(timeItem, index) {
            if (timeItem.id === time) {
                todoItem.time.splice(index, 1);
            }
        });
        db.deleteTodo(time);
    }

});
App.controller('TodoController', function($scope, $rootScope, localStorageService, config, db, aux) {

    init();

    function init() {
        $rootScope.users = localStorageService.get('users') || [];
        $rootScope.currentUser = localStorageService.get('currentUser');
        $rootScope.userPhoto = config.mediaUrl + $scope.currentUser.foto;
        $rootScope.currentDate = aux.getDateFromUTC(new Date());
        $rootScope.topPanelHider = false;

        createItemPrototype();

        if (!$scope.currentUser.role.add && !$scope.currentUser.role.edit &&
            !$scope.currentUser.role.remove && !$scope.currentUser.role.check) {
            $scope.patientListHide = true;
            $rootScope.currentPatient = $scope.currentUser;
        } else {
            $scope.patientListHide = false;
            $rootScope.currentPatient = $rootScope.users[0];
        }
    }

    function createItemPrototype() {
        $rootScope.todoExample = {
            edit: false,
            text: '',
            time: []
        };
    }

    function putUpdatedPatientInUserScope(patientId) {
        $rootScope.users.forEach(function(user, index) {
            if (user.id === patientId) {
                $rootScope.users[index] = $rootScope.currentPatient;
            }
        });
    }

    $scope.updateUserScope = function() {
        putUpdatedPatientInUserScope($rootScope.currentPatient.id);
        localStorageService.add('users', $rootScope.users);
    };

    $scope.addNewTodo = function() {
        if (!$scope.canAddTodo && !$rootScope.todoExample.text) return false;

        db.addTodo($rootScope.currentPatient.id, $rootScope.todoExample);
        createItemPrototype();
    };

    $scope.updateTodo = function() {
        if (!$scope.canEditTodo) return false;

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

    function getDateById(todoID, timeID) {
        for (var index = 0; index < $rootScope.currentPatient.todo.length; index++) {
            if ($rootScope.currentPatient.todo[index].id == todoID) {
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
        return $scope.currentUser.role.add && ($rootScope.currentDate >= aux.getDateFromUTC(new Date()));
    };

    $scope.canEditTodo = function(todoID, timeID) {
        if (!$scope.currentUser.role.edit) return false;

        var currentDate = new Date();
        var todoDate = new Date(getDateById(todoID, timeID));

        return (currentDate.getDate() <= todoDate.getDate()) &&
               (currentDate.getMonth() <= todoDate.getMonth()) &&
               (currentDate.getYear() <= todoDate.getYear());
    };

    $scope.canRemoveTodo = function(todoID, timeID) {
        if (!$scope.currentUser.role.remove) return false;

        var currentDate = new Date();
        var todoDate = new Date(getDateById(todoID, timeID));

        return (currentDate.getDate() <= todoDate.getDate()) &&
               (currentDate.getMonth() <= todoDate.getMonth()) &&
               (currentDate.getYear() <= todoDate.getYear());
    };

    $scope.canCheckTodo = function(time) {
        if (!$scope.currentUser.role.check || time.done) return false;

        var currentDate = new Date();
        var todoDate = new Date(time.date);

        return (currentDate.getDate() == todoDate.getDate()) &&
               (currentDate.getMonth() == todoDate.getMonth()) &&
               (currentDate.getYear() == todoDate.getYear());
    };

    $scope.prepareToRemove = function(todo) {
        db.editTodo(todo);
    };

    $scope.removeTodo = function(todo, time) {
        if (!$scope.canRemoveTodo) return false;

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

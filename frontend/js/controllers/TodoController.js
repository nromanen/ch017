
App.controller("TodoController", function ($scope, $rootScope, localStorageService, config, db) {

    $scope.roles = {};
    // this variable uses for edit todos and here will be new todo_item before save
    $scope.todoExample = {
        text: '',
        done: false,
        todo: []
    };

    init();

    function init() {

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
        if (!$scope.todoExample.text) return false;

        $scope.currentPatient.todo.push($scope.todoExample);
        db.addTodo($scope.currentPatient.id, $scope.todoExample);
        $scope.todoExample = {
            text: '',
            done: false,
            todo: []
        };
    };

    $scope.addNewDateTimeToTodo = function () {
        $scope.todoExample.todo.push({date: $scope.date, time: $scope.time})
    };

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
        $scope.currentPatient.todo = $scope.currentPatient.todo.filter(function(todo) {
            return !todo.done;
        });
    };

    $scope.removeTodo = function(index) {
        $scope.currentPatient.todo.splice(index, 1);
    }

});

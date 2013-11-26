
App.controller("TodoController", function ($scope, $rootScope, localStorageService, config) {

    $scope.roles = {};
    $scope.todoList = [];

    init();

    function init() {
         //list of todos
        $scope.todoList = localStorageService.get("todos_list") || [];

        $scope.statusInSystem = localStorageService.get("statusInSystem");

        $rootScope.showTopPanel = true;
        $rootScope.currentUser = $scope.statusInSystem.first_name + ' ' + $scope.statusInSystem.last_name;
        $rootScope.userPhoto = config.serverUrl + config.imagesPath + $scope.statusInSystem.foto;

        if($scope.statusInSystem.role.name === "patient") {
            $rootScope.patientListHide = true;
        } else {
            $rootScope.patientListHide = false;
        }

        /* TEMP */
        $scope.roles = {
            doctor: {name: "Doctor", role: {name: "doctor", add: true, remove: true, check: true, edit: true}},
            nurse: {name: "Nurse", role: {name: "nurse", add: false, remove: false, check: true, edit: false}},
            patient: {name: "Patient", role: {name: "patient", add: false, remove: false, check: false, edit: false}}
        };
    }

    //function update data in local storage after each change
    $scope.updateLocalStorage = function() {
        localStorageService.add('todos_list', $scope.todoList);
    }

    //check rules
    $scope.canAddTodo = function () {
        return $scope.statusInSystem.role.add;
    };

    $scope.canEditTodo = function () {
        return $scope.statusInSystem.role.edit;
    };

    $scope.canRemoveTodo = function () {
        return $scope.statusInSystem.role.remove;
    };

    $scope.canCheckTodo = function () {
        return $scope.statusInSystem.role.check;
    };

    $scope.changeStatusInSystem = function(role) {
        $scope.statusInSystem = role;

        return role;
    };

    $scope.addNewTodo = function() {
        if (!$scope.todoText) return false;

        var item = {text: $scope.todoText, done: false};

        $scope.todoList.push(item);
        $scope.todoText = '';
    };

    $scope.getActiveTaskQuantity = function() {
        var count = 0;

        $scope.todoList.forEach(function(todo) {
            if (!todo.done) {
                ++count;
            }
        });
        return count;
    };

    $scope.clearDoneTodos = function() {
        $scope.todoList = $scope.todoList.filter(function(todo) {
            return !todo.done;
        });
    };

    $scope.removeTodo = function(index) {
        $scope.todoList.splice(index, 1);
    }

});

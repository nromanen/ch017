//our controllers
function TodoController($scope, localStorageService) {

    $scope.roles = {};
    $scope.todoList = [];

    init();

    function init() {
         //list of todos
        $scope.todoList = localStorageService.get("todos_list") || [];

        //list of roles
        $scope.roles = {
            doctor: {name: "Doctor", rights: {add: true, remove: true, check: true, edit: true}},
            nurse: {name: "Nurse", rights: {add: false, remove: false, check: true, edit: false}},
            patient: {name: "Patient", rights: {add: false, remove: false, check: false, edit: false}}
        };

        //current user status in system
        $scope.statusInSystem = $scope.roles.doctor;

    }

    //function update data in local storage after each change
    function updateLocalStorage() {
        localStorageService.add("todos_list", $scope.todoList);
    }

    //check rules
    $scope.canAddTodo = function () {
        return $scope.statusInSystem.rights.add;
    };

    $scope.canEditTodo = function () {
        return $scope.statusInSystem.rights.edit;
    };

    $scope.canRemoveTodo = function () {
        return $scope.statusInSystem.rights.remove;
    };

    $scope.canCheckTodo = function () {
        return $scope.statusInSystem.rights.check;
    };

    $scope.changeStatusInSystem = function(role) {
        $scope.statusInSystem = role;

        return role;
    };

    $scope.addNewTodo = function() {

        if ($scope.todoText) {
            $scope.todoList.push({text: $scope.todoText, done:false});
            updateLocalStorage();
            $scope.todoText = '';
            return true;
        }
        return false;
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
        updateLocalStorage();
    }

    $scope.removeTodo = function(index) {
        $scope.todoList.splice(index, 1);
        updateLocalStorage();

        return true;
    }

    $scope.markDone = function() {
        updateLocalStorage();
    }

    $scope.updateTodo = function() {
        updateLocalStorage();
    }
}


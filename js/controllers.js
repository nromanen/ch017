var App = angular.module("App", ["LocalStorageModule"]);

App.config(function($routeProvider) {
      $routeProvider.when('/', {controller: TodosController, templateUrl: 'index.html'});
});

//our controllers
function TodosController($scope, localStorageService) {

    $scope.roles = {};
    $scope.todoList = [];

    init();

    function init() {

         //list of todos
        $scope.todoList = localStorageService.get("todos_list") || [];

        //list of roles
        $scope.roles = {
            admin: {name: "Doctor", rights: {add: true, remove: true, check: true, edit: true}},
            moder: {name: "Nurse", rights: {add: true, remove: false, check: true, edit: false}},
            user: {name: "Patient", rights: {add: false, remove: false, check: false, edit: false}}
        };

        //current user status in system
        $scope.statusInSystem = $scope.roles.user;

        hideAllRemoveIcon();

    }

    //function update data in local storage after each change
    function updateLocalStorage() {
        localStorageService.add("todos_list", $scope.todoList);
    }

    function hideAllRemoveIcon(){
        $scope.todoList.forEach(function(todo) {
            todo.showIcon = false;
        });
    }

    function updateSelectedTodo(index, text) {
        $scope.todoList[index].text = text;
    }

    $scope.changeStatusInSystem = function(role) {
        $scope.statusInSystem = role;

        return role;
    };

    $scope.manageTodoItem = function() {

        /*$scope.todoText contains text from input
        * $scope.todoIndex init when user want update exists todoItem
        * */
        if ($scope.todoText) {
            //use this condition because 0 in js is false but we have item with index 0
            if ($scope.todoIndex >= 0) {
                updateSelectedTodo($scope.todoIndex, $scope.todoText);
            } else {
                $scope.todoList.push({text: $scope.todoText, done:false, showIcon: false});
            }
            updateLocalStorage();
            delete $scope.todoIndex;
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
    };

    $scope.removeTodo = function(todo, have_right) {
        /*
        *check can user remove item or not
        * parameter @have_right gets from @$scope.statusInSystem.rights.remove of current user
        */
        if (have_right) {
            var index = $scope.todoList.indexOf(todo);

            $scope.todoList.splice(index, 1);
            updateLocalStorage();
            return true;
        }
        return false;

    };

    $scope.markDone = function() {
        updateLocalStorage();
    };

    $scope.updateTodo = function(todo) {
        var index = $scope.todoList.indexOf(todo);

        if ($scope.statusInSystem.rights.edit) {
            $scope.todoText = $scope.todoList[index].text;
            $scope.todoIndex = index;
            return true;
        }
    };

    $scope.showRemoveIcon = function(todo) {
        var index = $scope.todoList.indexOf(todo);

        if ($scope.statusInSystem.rights.remove) {
            $scope.todoList[index].showIcon = !$scope.todoList[index].showIcon;
        }
    };

}

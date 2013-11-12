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
            doctor: {name: "Doctor", rights: {add: true, remove: true, check: true, edit: true}},
            nurse: {name: "Nurse", rights: {add: true, remove: false, check: true, edit: false}},
            patient: {name: "Patient", rights: {add: false, remove: false, check: false, edit: false}}
        };

        //current user status in system
        $scope.statusInSystem = $scope.roles.patient;

        hideAllRemoveIcon();

    }

    //function update data in local storage after each change
    function updateLocalStorage() {
        localStorageService.add("todos_list", $scope.todoList);
    }

    function hideAllRemoveIcon() {
        $scope.todoList.forEach(function(todo) {
            todo.showIcon = false;
			todo.showInput = false;
        });
    }

    function updateSelectedTodo(index, text) {
        $scope.todoList[index].text = text;
    }

    function addNewTodo(text) {
        $scope.todoList.push({text: $scope.todoText, done:false, showIcon: false, showInput: false});
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
                addNewTodo($scope.todoText);
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

    $scope.removeTodo = function(todo) {
        var index = $scope.todoList.indexOf(todo);

        $scope.todoList.splice(index, 1);
        updateLocalStorage();

        return true;
    };

    $scope.markDone = function() {
        updateLocalStorage();
    };

    $scope.updateTodo = function() {
        updateLocalStorage();
    };
	
	$scope.showEditInput = function(index) {
		$scope.todoList[index].showInput = !$scope.todoList[index].showInput;
	};
	
	$scope.blur = function(){
		alert("here");
	};

    $scope.showRemoveIcon = function(todo) {
        var index = $scope.todoList.indexOf(todo);

        if ($scope.statusInSystem.rights.remove) {
            $scope.todoList[index].showIcon = !$scope.todoList[index].showIcon;
        }
    };

}

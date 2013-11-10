function TodosController($scope, localStorageService) {

    //list of todos
    if (localStorageService.get("todos_list")) {

        //get data from local storage
        $scope.todoList = localStorageService.get("todos_list");
        //this code needs for hide all removeIcon for each todo_item
        $scope.todoList.forEach(function(todo) {
            todo.showIcon = false;
        });
    } else {
        $scope.todoList = [];
    }

    //list of roles
    $scope.roles = {
        admin: {name: "Admin", rights: {add: true, remove: true, check: true, edit: true}},
        moder: {name: "Moder", rights: {add: true, remove: false, check: true, edit: false}},
        user: {name: "User", rights: {add: false, remove: false, check: false, edit: false}}
    };

    //function update data in local storage after each change
    function updateLocalStorage() {
        localStorageService.add("todos_list", $scope.todoList);
    }

    //current user status in system
    $scope.statusInSystem = $scope.roles.user;

    $scope.changeStatus = function(role) {
        $scope.statusInSystem = role;

        return role;
    };

    $scope.addNewTodo = function() {

        if ($scope.todoText.length > 0) {

            //compare with >= 0 because 0 is true
            if ($scope.todoIndex >= 0) {
                $scope.todoList[$scope.todoIndex].text = $scope.todoText
                //set false for case whe we add new todo_item
                $scope.todoIndex = false;
            } else {
                $scope.todoList.push({text: $scope.todoText, done:false, showIcon: false});
            }
            updateLocalStorage();
            //clear input
            $scope.todoText = '';
        } else {
            alert("Sorry, What are you gonna do?!");
            return false;
        }
    };

    $scope.taskQuantity = function() {
        var count = 0;

        $scope.todoList.forEach(function(todo) {
            if (!todo.done)
                ++count;
        });
        return count;
    };

    $scope.clearTodos = function() {

        //save old list of todos for loop
        var oldTodos = $scope.todoList;

        //clear old version of todos. Here we will save our actual todos
        $scope.todoList = [];
        oldTodos.forEach(function(todo) {
            if (!todo.done)
                $scope.todoList.push(todo);
        });
        updateLocalStorage();
    };

    $scope.removeTodo = function(todo, have_right) {
        var index = 0;

        /*
        *check can user remove item or not
        * parameter @have_right gets from @$scope.statusInSystem.rights.remove of current user
        */
        if (have_right) {
            index = $scope.todoList.indexOf(todo);
            $scope.todoList.splice(index, 1);
            updateLocalStorage();
        } else {
            alert("Permission denied!!!");
            return false;
        }

    };

    $scope.markDone = function(todo) {
        updateLocalStorage();
    };

    $scope.updateTodo = function(todo) {
        var index = $scope.todoList.indexOf(todo);

        if ($scope.statusInSystem.rights.edit){
            $scope.todoText = $scope.todoList[index].text;
            $scope.todoIndex = index;
        }
    };

    $scope.showRemoveIcon = function(todo) {
        var index = $scope.todoList.indexOf(todo);

        if ($scope.statusInSystem.rights.remove)
            $scope.todoList[index].showIcon = !$scope.todoList[index].showIcon;
    };

}

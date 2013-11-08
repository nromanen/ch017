/**
 * Created by tarix on 11/5/13.
 */
function TodoCtrl($scope) {
    var change = false;
    var index_ch = 0;
    $scope.policies = 'allow';
    $scope.visibl = function(){
        if ($scope.policies === 'deny'){
            return true;
        }
        else{
            return false;
        }
    };
    $scope.todos = [
        {text:'learn angular', done:true},
        {text:'visit softserve', done:false}];

    $scope.addTodo = function() {
        if ((change)&&($scope.policies === 'allow')) {
            $scope.todos[index_ch].text = $scope.todoText;
            $scope.todoText = '';
            change = false;
        }
        if ((!!$scope.todoText)&&(($scope.policies === 'allow')||($scope.policies === 'only_add')))
        {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = '';
        }
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        if ($scope.policies === 'allow')
        {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        }

    };
    $scope.removeTodo = function(idd) {
        if ($scope.policies === 'allow')
        {
            $scope.todos.splice(idd,1);
        }
    }
    $scope.select_item = function(ind){
        if ($scope.policies === 'allow'){
            $scope.todoText = $scope.todos[ind].text;
            index_ch = ind;
            change = true;
        }
    }
}

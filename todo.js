    var acsessLevel = 0; 
	var btnvalue = 0;	
		function TodoCtrl($scope) {
			$scope.todos =[
				{text:'Simple text', done:false},
					{text:'And this is also simple text', done:false},
					{text:'And this', done:false},
					{text:'This is line-through text', done:true
					
					}];
	 
    $scope.addTodo = function() {
	
	if (acsessLevel === 1 || acsessLevel === 2 && btnvalue === 0 ){
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
	}
	
	else if (acsessLevel === 1 || acsessLevel === 2 && btnvalue === 1 ) {
		this.todos[index] = {text:$scope.todoText, done:false};
		$scope.todoText = '';
		btnvalue = 0;
		document.getElementById('buttonSend').value = 'Add text';
	}else{
		alert('No enought acsess level to do this');
	};
    } 
    $scope.del = function(ToRemove) {	
	if (acsessLevel !== 2){
	alert('No enought acsess level to do this');
	}else{
		var index = this.todos.indexOf(ToRemove);
		this.todos.splice(index, 1);
	}
	}
	
	$scope.edit = function(editme){
	
	if (acsessLevel !== 2){
	alert('No enought acsess level to do this')
	}else{
		index = this.todos.indexOf(editme);
		$scope.todoText = this.todos[index].text;
		document.getElementById('buttonSend').value = 'Edit text';
		btnvalue = 1;
	}
	}
	
	$scope.level0 = function() {acsessLevel = 0;}
	$scope.level1 = function() {acsessLevel = 1;}
	$scope.level2 = function() {acsessLevel = 2;}
		
    }

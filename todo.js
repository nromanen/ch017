    var acsessLevel = 'ROOT'; 
	var btnValue = 'ADD';	
		function TodoCtrl($scope) {
		
		
		
			$scope.todos = [
							{text:'Simple text', done:false},
							{text:'And this is also simple text', done:false},
							{text:'And this', done:false},
							{text:'This is line-through text', done:true}
							];
	 
    $scope.addTodo = function() {
	
	if (acsessLevel === 'READ_CREATE' || acsessLevel === 'ROOT' && btnValue === 'ADD' ){
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
	}
	
	else if (acsessLevel === 'READ_CREATE' || acsessLevel === 'ROOT' && btnValue === 'EDIT' ) {
		this.todos[index] = {text:$scope.todoText, done:false};
		$scope.todoText = '';
		btnValue = 'ADD';
		document.getElementById('buttonSend').value = 'Add text';
	}else{
		alert('No enought acsess level to do this');
	};
    } 
    $scope.del = function(ToRemove) {
	if (acsessLevel !== 'ROOT'){
		alert('No enought acsess level to do this');
	}else{
		var index = this.todos.indexOf(ToRemove);
		this.todos.splice(index, 1);
	}
	}
	
	$scope.edit = function(editElem){
	if (acsessLevel !== 'ROOT'){
	alert('No enought acsess level to do this');
	}else{
		index = this.todos.indexOf(editElem);
		$scope.todoText = this.todos[index].text;
		document.getElementById('buttonSend').value = 'Edit text';
		btnValue = 'EDIT';
	}
	}
	
		$scope.go = function() {
    	acsessLevel = $scope.acsessLvl;
		}
	
		
    }

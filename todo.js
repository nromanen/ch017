var acsessLevel = 'ROOT'; // acsess level variable. may be ROOT or READ_CREATE  
var btnValue = 'ADD'; // value of my button. may be ADD or EDIT
//localStorage.clear();
	function TodoCtrl($scope) {
	var retrievedObject = localStorage.getItem('$scope.todos'); // getting object in local db
	$scope.todos = JSON.parse(retrievedObject);
	if ($scope.todos === null){ // if my local base db empty - add some elements to there
	localStorage.setItem('$scope.todos', JSON.stringify([{text:'Simple text', done:false},
							{text:'And this is also simple text', done:false},
							{text:'And this', done:false},
							{text:'This is line-through text', done:true}]));
	}
 $scope.todoText = '';
 $scope.AddTodo = function () {
		if ($scope.todoText.length < 1){
		alert('Empty form is not valid value');
		} else if (acsessLevel === 'READ_CREATE' || acsessLevel === 'ROOT' && btnValue === 'ADD') { //cheking acsess level of user and what this button imidiatly did
            
			$scope.todos.push({
                text: $scope.todoText,
                done: false
            });
            $scope.todoText = '';
            localStorage.setItem('$scope.todos', JSON.stringify($scope.todos)); // save changes in local db
        } else if (acsessLevel === 'READ_CREATE' || acsessLevel === 'ROOT' && btnValue === 'EDIT') {
            this.todos[index] = {
                text: $scope.todoText,
                done: false
            };
            $scope.todoText = '';
            btnValue = 'ADD';
            document.getElementById('buttonSend').value = 'Add text'; //change visual value of button
            localStorage.setItem('$scope.todos', JSON.stringify($scope.todos));
        } else {
            alert('No enought acsess level to do this');
        }
    }
    $scope.Del = function (ToRemove) {
        if (acsessLevel !== 'ROOT') {
            alert('No enought acsess level to do this');
        } else {
            var index = this.todos.indexOf(ToRemove); //finding the element what i neeed to delete
            this.todos.splice(index, 1); //delete 
            localStorage.setItem('$scope.todos', JSON.stringify($scope.todos));
        }
    }

    $scope.Edit = function (EditElem) {
        if (acsessLevel !== 'ROOT') {
            alert('No enought acsess level to do this');
        } else {
            index = this.todos.indexOf(EditElem);
            $scope.todoText = this.todos[index].text;
            document.getElementById('buttonSend').value = 'Edit text';
			document.getElementById('textInput').focus()
			btnValue = 'EDIT';
        }
    }
    $scope.GetAcsessLvl = function () { //get acsess level of user
        acsessLevel = $scope.acsessLvl;
    }

    $scope.SaveBox = function () { // save our box status
        localStorage.setItem('$scope.todos', JSON.stringify($scope.todos));
    }

    /*
	var listElem = document.getElementById('selected'); //for debug
	firstElem = listElem.getElementsByTagName('option')[0];
	console.log(firstElem);
	*/
}


App.controller("UserListController", function ($scope) {

    $scope.userList = [
        {name: 'Adam'},
        {name: 'Moel'},
        {name: 'Mello'},
        {name: 'John'},
        {name: 'Andrew'},
        {name: 'Nick'},
        {name: 'Andrew'},
        {name: 'John J'}
    ];
	function sortByAlphabet(personA, personB) { //sort patient's by alphabet
		return personA.name > personB.name;
	}
	
	$scope.userList.sort(sortByAlphabet); //call sort function
	
    $scope.getActivePatient = function () {
        $scope.currentPatient = this.user.name;
        console.log($scope.currentPatient)
    }
});
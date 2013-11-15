function UserListController($scope) {

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

    $scope.getActivePatient = function () {
        $scope.currentPatient = this.user.name;
        console.log($scope.currentPatient)
    }
}
angular.module('project', ['mongolab', 'LocalStorageModule']).
	config(function($routeProvider) {
		$routeProvider.
		when('/', {controller:ListCtrl, templateUrl:'view/list.html'}).
		otherwise({redirectTo:'/'});
});

function ListCtrl($scope, Project, localStorageService) {
	console.log(localStorageService.get("list"));
	//if (localStorageService.get("list")){
        //$scope.projects = localStorageService.get("list");
    //} else {
        $scope.projects = Project.query();
		localStorageService.clearAll();
		localStorageService.add("list",'Ultimate Frisbee');

			console.log(localStorageService.get("list"));
				console.log($scope.projects);
    //}
	// role section //
	$scope.d = 0;
	$scope.c = 0;
	// end role section //
}

function CreateCtrl($scope, $location, Project) {
	$scope.save = function() {
		$scope.project.todo = false;
		Project.save($scope.project);
	}
}

function ChangeCtrl($scope, $location, Project) {
	$scope.save = function() {
		delete $scope.project._id;
		Project.update($scope.project);
	}
}

function DeleteCtrl($scope, $location, Project) {
	$scope.remove = function() {
		Project.remove($scope.project);
	}
}

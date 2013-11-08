angular.module('project', ['mongolab']).
	config(function($routeProvider) {
		$routeProvider.
		when('/', {controller:ListCtrl, templateUrl:'list.html'}).
		otherwise({redirectTo:'/'});
});

function ListCtrl($scope, Project) {
	$scope.projects = Project.query();
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

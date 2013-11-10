angular.module('project', ['LocalStorageModule']);

function ListCtrl($scope, localStorageService) {

    if (localStorageService.get("list")) {
        $scope.projects = localStorageService.get("list");
    } else {
        $scope.projects = [];
    }
	
	$scope.add = function() {
		$scope.project.todo = false;
		$storage.projects.push = $scope.project;
		//Project.save($scope.project);
		//$scope.project.push({text:$scope.todoText, done:false});
	}

	$scope.save = function() {
		delete $scope.project._id;
		//Project.update($scope.project);
	}
	
	$scope.remove = function() {
		//Project.remove($scope.project);
	}
}

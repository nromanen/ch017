var App = angular.module(
   "App",
   [
       "LocalStorageModule"
   ]
).config(function ($routeProvider) {

    $routeProvider.when('/', {controller: 'TodoController', templateUrl: 'templates/todo.html'});
    $routeProvider.when('/auth', {controller: 'AuthController', templateUrl: 'templates/auth.html'});
    $routeProvider.when('/auth/:param', {controller: 'AuthController', templateUrl: 'templates/auth.html'});
    $routeProvider.when('/patientList', {controller: 'PatientListController', templateUrl: 'templates/patientList.html'});
    $routeProvider.when('/:type/:login', {controller: '', templateUrl: 'templates/todo.html'});
    $routeProvider.otherwise({redirectTo:'/'});

}).run(function($rootScope, localStorageService, $http, $location, $routeParams, routeOnLoad) {

    $rootScope.$on('$routeChangeSuccess', function () {
        if($routeParams.param === 'logout') return false;

        //routeOnLoad.getUserData($rootScope, localStorageService, $http, $location);
    });
});

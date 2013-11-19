var App = angular.module(
   "App",
   [
       "LocalStorageModule"
   ]
).config(function ($routeProvider) {

    $routeProvider.when('/', {controller: 'TodoController', templateUrl: 'templates/todo.html'});
    $routeProvider.when('/auth', {controller: 'AuthController', templateUrl: 'templates/auth.html'});
    $routeProvider.when('/userList', {controller: 'UserListController', templateUrl: 'templates/userList.html'});
    $routeProvider.when('/:type/:login', {controller: '', templateUrl: 'templates/todo.html'});
    $routeProvider.otherwise({redirectTo:'/'});

}).run(function($rootScope, localStorageService, $http, $location) {

    $rootScope.$on('$routeChangeSuccess', function () {
        //routeOnLoad.getUserData($rootScope, localStorageService, $http, $location);
    });
});

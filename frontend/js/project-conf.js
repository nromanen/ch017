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

}).run(function($rootScope, localStorageService, $http, $location, routeOnLoad) {

    $rootScope.$on('$routeChangeSuccess', function () {
        /* To uncomment this when we will have an access to the server. */
        //routeOnLoad.getUserData($rootScope, localStorageService, $http, $location);
    });
});

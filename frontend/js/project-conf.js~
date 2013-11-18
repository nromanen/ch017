var App = angular.module(
   "App",
   [
       "LocalStorageModule",
       "todo-blur",
       "todo-click",
       "todo-mouseover",
       "todo-mouseout",
       "patientList"
   ]
).config(function($routeProvider) {

    $routeProvider.when('/', {controller: '', templateUrl: 'templates/todo.html'});
    $routeProvider.when('/auth', {controller: '', templateUrl: 'templates/auth.html'});
    $routeProvider.when('/userList', {controller: '', templateUrl: 'templates/userList.html'});
    $routeProvider.when('/:type/:login', {controller: '', templateUrl: 'templates/todo.html'});
           
}).run(function($rootScope, localStorageService, $http, $location) {

    $rootScope.$on('$routeChangeSuccess', function () {
        routeOnLoad($rootScope, localStorageService, $http, $location);
        $rootScope.getUserData();
    });
    
});

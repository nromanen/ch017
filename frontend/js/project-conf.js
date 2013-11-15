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

    $routeProvider.when('/', {controller: TodoController, templateUrl: 'templates/todo.html'});
    $routeProvider.when('/auth', {controller: '', templateUrl: 'templates/auth.html'});
    $routeProvider.when('/userList', {controller: '', templateUrl: 'templates/userList.html'});
           
}).run(function($rootScope) {

   $rootScope.$on('$routeChangeSuccess', function () {
       //TODO: Get rights from server shall implement here
   })

});
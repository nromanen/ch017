var App = angular.module(
    "App",
    [
        "LocalStorageModule",
        "todo-blur",
        "todo-click",
        "todo-mouseover",
        "todo-mouseout"
    ]
);

App.config(function($routeProvider) {
      $routeProvider.when('/', {controller: TodoCtrl, templateUrl: 'index.html'});
});

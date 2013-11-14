var App = angular.module(
    "App",
    [
        "LocalStorageModule",
        "todo-blur",
        "todo-click",
        "todo-mouseover",
        "todo-mouseout"
    ]
).config(function($routeProvider) {
        $routeProvider.when('/', {controller: TodoCtrl, templateUrl: 'index.html'});
    }
).run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function () {
        //TODO: Get rights from server shall implement here
    })
});

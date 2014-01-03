
App.config(function($routeProvider) {

    $routeProvider.
    when('/auth', {templateUrl: 'templates/auth.html'}).
    when('/auth/:param', {templateUrl: 'templates/auth.html'}).
    when('/:type/:login', {templateUrl: 'templates/todo.html'}).
    otherwise({redirectTo: '/auth'});

});

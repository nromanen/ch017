var App = angular.module(
   "App",
   [
       "LocalStorageModule"
   ]
).config(function ($routeProvider) {

    $routeProvider.
    when('/auth', {templateUrl: 'templates/auth.html'}).
    when('/auth/:param', {templateUrl: 'templates/auth.html'}).
    when('/:type/:login', {templateUrl: 'templates/todo.html',
        resolve: {
            data: function (db) {
                return db.getPatientList();
            }
        }
    }).
    otherwise({redirectTo: '/auth'});

}).run(function($rootScope, localStorageService, $http, $location, $routeParams, routeOnLoad) {

    $rootScope.$on('$routeChangeSuccess', function () {
        if($routeParams.param === 'logout') return false;

        routeOnLoad.getUserData($rootScope, localStorageService, $http, $location);
    });

}).constant('config', {
        serverUrl: 'http://localhost:8000/',
        imagesPath: 'media/',
        apiUrl: 'api/',
        jsonpCallback: '?callback=JSON_CALLBACK'
    }
).constant('dayPart', {
        morning: 0,
        noon: 12,
        evening: 18
    }
);

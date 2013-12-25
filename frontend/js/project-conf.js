var App = angular.module('App', [
    'LocalStorageModule',
    'pascalprecht.translate'
]).run(function($rootScope, localStorageService, $http, $location, $routeParams, routeOnLoad) {

    $rootScope.$on('$routeChangeSuccess', function() {
        if ($routeParams.param === 'logout') return false;

        routeOnLoad.getUserData($rootScope, localStorageService, $http, $location);
    });

}).constant('config', {
    serverUrl: 'http://localhost:8000/',
    imagesPath: 'media/',
    apiUrl: 'api/',
    jsonpCallback: '?callback=JSON_CALLBACK',
    lang: 'en'
}).constant('dayPart', {
    morning: 0,
    noon: 12,
    evening: 18
});

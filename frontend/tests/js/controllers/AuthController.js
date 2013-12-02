describe('Authorization controller', function() {

    var localStorage = {};
    var $routeParams = {};
    var db = {};
    var aux = {};

    beforeEach(function () {
        var store = {};

        //create mock-object for localStorageService
        localStorage = {
            get: function (key) {
                return store[key];
            },

            add: function (key, value) {
                return store[key] = value + '';
            },

            clearAll: function () {
                store = {};
            }
        }
        $routeParams.param = 'logout';
    });

    beforeEach(module('App'));

    it('Should initialize contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('AuthController', {$scope: $rootScope, $routeParams: $routeParams, db: db, aux: aux});
    }));

    it('Should logout user', inject(function($controller, $rootScope) {
        var controller = $controller('AuthController', {$scope: $rootScope});

        expect($rootScope.logout()).toBe(false);
    }));

    it('Should check user data from server', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('AuthController', {$scope: $rootScope});

        expect($rootScope.sendData()).toBeUndefined();
    }));

});

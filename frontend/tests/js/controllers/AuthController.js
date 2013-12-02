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

    it('Should logout user', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.logout()).toBe(false);
    }));

    it('Should show hint', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.hint()).toBeUndefined();
    }));

    it('Should save role in the local storage', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});
        var data = true;

        expect($rootScope.saveRole(data)).toBeUndefined();
    }));

    it('Should redirect to path', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.redirectTo()).toBeUndefined();
    }));

    it('Should check user data from server', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});
        
        $httpBackend.expectGET('backend/check-user.json').respond(200, {});
        expect($rootScope.sendData()).toBeUndefined();
        
        $httpBackend.expectGET('backend/check-user.json').respond(200, {"result":false,"error":1});
        expect($rootScope.sendData()).toBeUndefined();
        
        $httpBackend.expectGET('backend/check-user.json').respond(404, false);
        expect($rootScope.sendData()).toBeUndefined();
        
        $httpBackend.flush();
    }));

});

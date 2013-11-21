describe('Authorization controller', function() {

    var localStorage = {};

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

            clear: function () {
                store = {};
            }
        }
    });

    beforeEach(module('App'));
    
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

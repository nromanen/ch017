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

    it('Should check answer returned from server', inject(function ($controller, $rootScope) {
        var ctrl = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});
        var flag;
        var status;
        var data = {};
        
        /* condition for status >>> begin */
        runs(function() {
            flag = false;
            status = 501;
            
            expect($rootScope.checkServerAnswer(status)).toBe(false);
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });
        
        waitsFor(function() {
            status = 200;
            return flag;
        }, "Status should be HTTP 200", 750);
        
        runs(function() {
            expect($rootScope.checkServerAnswer(status, data)).toBe(true);
        });
        /* condition for status >>> end */
        
        /* condition for result >>> begin */
        runs(function() {
            flag = false;
            data.result = false;
            data.error = 2;
            
            expect($rootScope.checkServerAnswer(status, data)).toBe(false);
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });
        /* condition for result >>> end */
    }));
    
    it('Should check user data from server', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});
        
        $httpBackend.expectGET('backend/check-user.json').respond(200, {});
        expect($rootScope.sendData()).toBe(true);
        
        $httpBackend.expectGET('backend/check-user.json').respond(200, {"result":false,"error":1});
        expect($rootScope.sendData()).toBe(true);
        
        $httpBackend.expectGET('backend/check-user.json').respond(404, false);
        expect($rootScope.sendData()).toBe(true);
        
        $httpBackend.flush();
    }));

});

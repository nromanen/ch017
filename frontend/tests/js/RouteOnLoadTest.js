describe('Route on load controller', function() {

    /* mock for $http */
/*
    var $http = function(headers) {
        return {
            status: 200,
            data: {
                "login":"VasyaPupkin",
                "name":"Vasia Pupkin",
                "type":"patient",
                "rights":{
                    "add":false,
                    "remove":false,
                    "check":false,
                    "edit":false
                }
            },
            success: function(data, status) {
                console.log(this.status);
                return this;
            },
            error: function(data, status) {
                //console.log(status);
                return this;
            }
        }
    }
    
        var http = 
        $http({
            method: 'GET', 
            url: 'backend/get-user.json', 
            data: {'login': 'VasyaPupkin'}
        }).
        success().
        error();
        
*/

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
    
    it('Should check answer returned from server', inject(function ($controller, $rootScope) {
        var ctrl = $controller('routeOnLoad', {$rootScope: $rootScope, localStorageService: localStorage});
        var flag;
        var status;
        var result;
        
        /* condition for status >>> begin */
        runs(function() {
            flag = false;
            status = 501;
            
            expect($rootScope.checkServerAnswer(status, result)).toBe(false);
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });
        
        waitsFor(function() {
            status = 200;
            return flag;
        }, "Status should be HTTP 200", 750);
        
        runs(function() {
            expect($rootScope.checkServerAnswer(status, result)).toBe(true);
        });
        /* condition for status >>> end */
        
        /* condition for result >>> begin */
        runs(function() {
            flag = false;
            result = false;
            
            expect($rootScope.checkServerAnswer(status, result)).toBe(false);
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });
        
        waitsFor(function() {
            result = true;
            return flag;
        }, "Result should be true", 750);
        
        runs(function() {
            expect($rootScope.checkServerAnswer(status, result)).toBe(true);
        });
        /* condition for result >>> end */
    }));
    
    it('Should save role status into the $rootScope', inject(function ($controller, $rootScope) {
        var ctrl = $controller('routeOnLoad', {$rootScope: $rootScope, localStorageService: localStorage});
        var data = {};
        
        expect($rootScope.saveStatusInSystem(data)).toBe(true);
    }));
    
    it('Should redirect to the path', inject(function ($controller, $rootScope) {
        var ctrl = $controller('routeOnLoad', {$rootScope: $rootScope, localStorageService: localStorage});
        var url = '/auth';
        
        expect($rootScope.redirectTo(url)).toBeUndefined();
    }));
    
    it('Should get user data from server', inject(function($controller, $rootScope, $httpBackend) {
        var controller = $controller('routeOnLoad', {$scope: $rootScope, localStorageService: localStorage});
        
        $httpBackend.expectGET('backend/get-user.json').respond(200, {});
        expect($rootScope.getUserData()).toBe(true);
        
        $httpBackend.expectGET('backend/get-user.json').respond(200, {"result":false});
        expect($rootScope.getUserData()).toBe(true);
        
        $httpBackend.expectGET('backend/get-user.json').respond(404, false);
        expect($rootScope.getUserData()).toBe(true);
        
        $httpBackend.flush();
    }));
    
});

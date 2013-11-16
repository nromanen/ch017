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

    var localStorage,
        routeOnLoad;

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

    beforeEach(function () {
        module("App");
    });

    beforeEach(inject(function ($injector, $controller, $rootScope, $location, $httpBackend) {
        this.$location = $location;
        this.$httpBackend = $httpBackend;
        this.scope = $rootScope.$new();
        routeOnLoad = $injector.get('routeOnLoad');
    }));

    it('Should check answer returned from server', function ($rootScope) {
        var flag;
        var status;
        var result;

        /* condition for status >>> begin */
        runs(function() {
            flag = false;
            status = 501;
            
            expect(routeOnLoad.checkServerAnswer(status, result)).toBe(false);
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            status = 200;
            return flag;
        }, "Status should be HTTP 200", 750);

        runs(function() {
            expect(routeOnLoad.checkServerAnswer(status, result)).toBe(true);
        });
        /* condition for status >>> end */
        
        /* condition for result >>> begin */
        runs(function() {
            flag = false;
            result = false;
            
            expect(routeOnLoad.checkServerAnswer(status, result)).toBe(false);
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });
        
        waitsFor(function() {
            result = true;
            return flag;
        }, "Result should be true", 750);
        
        runs(function() {
            expect(routeOnLoad.checkServerAnswer(status, result)).toBe(true);
        });
        /* condition for result >>> end */
    });
    
    it('Should save role status into the $rootScope', function ($rootScope) {
        var data = {};
        
        expect(routeOnLoad.saveStatusInSystem(data)).toBe(true);
    });
    
    it('Should redirect to the path', inject(function ($rootScope) {
        var url = '/auth';
        
        expect(routeOnLoad.redirectTo(url)).toBeUndefined();
    }));
    
    it('Should get user data from server', inject(function($rootScope, $httpBackend) {
        
        $httpBackend.expectGET('backend/get-user.json').respond(200, {});
        expect(routeOnLoad.getUserData()).toBe(true);
        
        $httpBackend.expectGET('backend/get-user.json').respond(200, {"result":false});
        expect(routeOnLoad.getUserData()).toBe(true);
        
        $httpBackend.expectGET('backend/get-user.json').respond(404, false);
        expect(routeOnLoad.getUserData()).toBe(true);
        
        $httpBackend.flush();
    }));
    
});

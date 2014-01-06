describe('Route on load controller', function() {

    var localStorage,
        routeOnLoad;
    var $httpBackend;

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

    beforeEach(inject(function ($injector, $location, $httpBackend) {
        this.$location = $location;
        this.$httpBackend = $httpBackend;
        routeOnLoad = $injector.get('routeOnLoad');
    }));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'api/users_by_role/patient/').respond(['a', 'b', 'c']);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('Should redirect to the path', inject(function () {
        var url = '/auth';
        
        expect(routeOnLoad.redirectTo(url)).toBeUndefined();
    }));
    
    it('Should get user data from local storage', inject(function(localStorageService) {
        var flag;

        runs(function() {
            flag = false;
            localStorageService.add('currentUser', null);
            expect(routeOnLoad.getUserData()).toBe(false);
            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            localStorageService.add('currentUser', {login: true, role: {name: true}});
            return flag;
        }, "User login should not be empty", 750);

        runs(function() {
            $httpBackend.expectGET('api/users_by_role/patient/');
            expect(routeOnLoad.getUserData()).toBeUndefined();
            $httpBackend.flush();
        });
    }));
    
});

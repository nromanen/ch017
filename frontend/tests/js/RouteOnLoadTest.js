describe('Route on load controller', function() {

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

    beforeEach(inject(function ($injector, $location, $httpBackend) {
        this.$location = $location;
        this.$httpBackend = $httpBackend;
        routeOnLoad = $injector.get('routeOnLoad');
    }));
    
    it('Should save role status into the $scope', function () {
        var data = {};
        
        expect(routeOnLoad.saveStatusInSystem(data)).toBeUndefined();
    });
    
    it('Should redirect to the path', inject(function () {
        var url = '/auth';
        
        expect(routeOnLoad.redirectTo(url)).toBeUndefined();
    }));
    
    it('Should get user data from server', inject(function($httpBackend) {
        
        $httpBackend.expectGET('backend/get-user.json').respond(200, {});
        expect(routeOnLoad.getUserData()).toBeUndefined();
        
        $httpBackend.expectGET('backend/get-user.json').respond(200, {"result":false});
        expect(routeOnLoad.getUserData()).toBeUndefined();
        
        $httpBackend.expectGET('backend/get-user.json').respond(404, false);
        expect(routeOnLoad.getUserData()).toBeUndefined();
        
        $httpBackend.flush();
    }));
    
});

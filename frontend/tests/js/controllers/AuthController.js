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

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'api/user/doctor/YXBwbGU=/').respond({role: {name: 'Doctor'}, login: 'doctor'});
        $httpBackend.when('GET', 'api/users_by_role/patient/').respond([1, 2, 3]);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should initialize contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('AuthController', {$scope: $rootScope, $routeParams: $routeParams});
    }));

    it('Should logout user', inject(function($controller, $rootScope) {
        var controller = $controller('AuthController', {$scope: $rootScope});

        expect($rootScope.logout()).toBe(false);
    }));

    it('Should check user data from server', inject(function($controller, $rootScope) {
        var controller = $controller('AuthController', {$scope: $rootScope});

        $rootScope.authLogin = 'doctor';
        $rootScope.authPassword = 'apple';

        $httpBackend.expectGET('api/user/doctor/YXBwbGU=/');
        $httpBackend.expectGET('api/users_by_role/patient/');
        expect($rootScope.submit()).toBeUndefined();
        $httpBackend.flush();
    }));

});

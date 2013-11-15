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

    it('Should validate authorization form', inject(function (_$httpBackend_, $controller, $rootScope) {
        var ctrl = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});
        var $httpBackend = _$httpBackend_;

        expect($rootScope.showHint()).toBe(true);
    }));
    
    it('Should validate authorization form', inject(function (_$httpBackend_, $controller, $rootScope) {
        var ctrl = $controller('AuthController', {$scope: $rootScope, localStorageService: localStorage});
        var $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

        expect($rootScope.checkUser()).toBe(true);
    }));

});

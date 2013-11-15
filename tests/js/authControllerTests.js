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
    
    it('Should validate authorization form', inject(function ($controller, $rootScope) {
        var ctrl = $controller('authController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.showHint()).toBe(true);
    }));
    
    it('Should validate authorization form', inject(function ($controller, $rootScope) {
        var ctrl = $controller('authController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.checkUser()).toBe(true);
    }));

});

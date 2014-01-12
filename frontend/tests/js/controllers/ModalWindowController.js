describe('ModalWindowController', function() {

    var localStorage = {};
    var $httpBackend;

    beforeEach(function () {
        var store = {};

        //create mock-object for localStorageService
        localStorage = {
            get: function (key) {
                return store[key];
            },

            add: function (key, value) {
                return store[key] = value;
            },

            clear: function () {
                store = {};
            }
        }
    });

    beforeEach(module('App'));

    it('Should initialize the controller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});
    }));

    it('Should set time array in modalWindow scope', inject(function ($controller, $rootScope) {
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.setTimeModal()).toBeUndefined();
    }));

    it('Should get date start date', inject(function ($controller, $rootScope) {
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.getStartDate()).toBeUndefined();
    }));

    it('Should add data to todoExample object', inject(function ($controller, $rootScope) {
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.todoExample = {};
        $rootScope.timeArr = [{}];
        $rootScope.dateArr = [{}];

        expect($rootScope.addTodoExample()).toBeUndefined();
    }));

    it('Should remove time from timeArr', inject(function ($controller, $rootScope) {
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.removeTimeTodo()).toBeUndefined();
    }));

    it('Should remove date from dateArr', inject(function ($controller, $rootScope) {
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.removeDateTodo()).toBeUndefined();
    }));
});

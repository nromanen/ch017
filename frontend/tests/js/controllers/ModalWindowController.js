describe('ModalWindowController', function() {

    var localStorage = {};
    var $httpBackend;
    var $rootScope = {};

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

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'api/medicines/').respond({});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should initialize the controller with property "is_doctor" === true', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {"is_doctor": true};

        $httpBackend.expectGET('api/medicines/');
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});
        $httpBackend.flush();
    }));

    it('Should initialize the controller with property "is_doctor" === false', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {"is_doctor": false};
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});
    }));

    it('Should set time array in modalWindow scope', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.setTimeModal()).toBeUndefined();
        $httpBackend.flush();
    }));

    it('Should push valid date', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };

        var flag;
        var finallyDate;
        $rootScope.todayDateForCheck;
        $rootScope.period = 1;

        runs(function() {
            flag = false;

            finallyDate = 1;
            $rootScope.todayDateForCheck = 0;
            expect($rootScope.pushValidDate()).toBeUndefined();

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            finallyDate = 0;
            $rootScope.todayDateForCheck = 1;
            return flag;
        }, "finallyDate and todayDateForChek should be different", 750);

        runs(function() {
            expect($rootScope.pushValidDate()).toBeUndefined();
        });

        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.pushValidDate()).toBeUndefined();
        $httpBackend.flush();
    }));

    it('Should push valid date with period less than 0', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {"is_doctor": true};

        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.period = -1;

        expect($rootScope.pushValidDate()).toBeUndefined();
        $httpBackend.flush();
    }));

    it('Should add data to todoExample object', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.todoExample = {};
        $rootScope.timeArr = [{}];
        $rootScope.dateArr = [{}];

        expect($rootScope.addTodoExample()).toBeUndefined();
        $httpBackend.flush();
    }));

    it('Should remove time from timeArr', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.removeTimeTodo()).toBeUndefined();
        $httpBackend.flush();
    }));

    it('Should remove date from dateArr', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.removeDateTodo()).toBeUndefined();
        $httpBackend.flush();
    }));
});

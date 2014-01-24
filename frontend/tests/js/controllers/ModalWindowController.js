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

    it('Should initialize the controller', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };

        $httpBackend.expectGET('api/medicines/');
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});
        $httpBackend.flush();
    }));

    it('Should set time array in modalWindow scope', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };
        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.setTimeModal()).toBeUndefined();
        $httpBackend.flush();
    }));

    it('Should get date start date', inject(function ($controller, $rootScope) {
        $rootScope.currentUser = {
            "is_doctor": "true"
        };

        var flag;
        var finallyDate;
        $rootScope.todayDateForCheck;

        runs(function() {
            flag = false;

            finallyDate = 1;
            $rootScope.todayDateForCheck = 0;
            expect($rootScope.getStartDate()).toBeUndefined();

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
            expect($rootScope.getStartDate()).toBeUndefined();
        });

        var ctrl = $controller('ModalWindowController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.getStartDate()).toBeUndefined();
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

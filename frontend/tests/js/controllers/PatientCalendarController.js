describe('PatientCalendarController', function() {

    var localStorage = {};

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

    it('Should get all dates from all todos', inject(function ($controller, $rootScope) {
        $rootScope.currentPatient = {todo: []};
        $rootScope.currentPatient.todo.push({time: [{}, {}]});
        $rootScope.currentPatient.todo.push({time: [{}, {}]});

        var ctrl = $controller('PatientCalendarController', {$scope: $rootScope, localStorageService: localStorage});
        var flag;

        runs(function() {
            flag = false;

            expect($rootScope.getDates()).toBeUndefined();

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.currentPatient = {todo: []};
            return flag;
        }, "Should not be empty", 750);

        runs(function() {
            expect($rootScope.getDates()).toBeUndefined();
        });
    }));

});

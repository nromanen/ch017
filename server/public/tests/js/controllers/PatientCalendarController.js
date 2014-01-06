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
        var currentPatient = {"todo": [{"time": [{"time": ""}, {"time": ""}]}]};
        $rootScope.currentPatient = currentPatient;

        var ctrl = $controller('PatientCalendarController', {
            $scope: $rootScope, localStorageService: localStorage
        });
        var flag;
        var flag1;

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

            /* dates.length === 0 => begin */
            $rootScope.currentPatient = {"todo": [{"time": []}]};
            var ctrl = $controller('PatientCalendarController', {
                $scope: $rootScope, localStorageService: localStorage
            });

            runs(function() {
                flag1 = false;

                expect($rootScope.getDates()).toBeUndefined();

                setTimeout(function() {
                    flag1 = true;
                }, 500);
            });

            waitsFor(function() {
                $rootScope.currentPatient = {todo: []};
                return flag1;
            }, "Should not be empty", 750);

            runs(function() {
                expect($rootScope.getDates()).toBeUndefined();
            });
            /* dates.length === 0 => end */
        });
    }));

});

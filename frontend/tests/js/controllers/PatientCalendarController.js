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
        var currentPatient = {"todo": [{"time": [{"date": "11-12-2013"}, {"date": "12-12-2013"}]}]};
        $rootScope.currentPatient = currentPatient;

        var ctrl = $controller('PatientCalendarController', {
            $scope: $rootScope, localStorageService: localStorage
        });

    }));

});

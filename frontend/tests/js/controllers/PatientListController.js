describe('PatientListController', function() {

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

    it('Should initialize the contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('PatientListController', {$scope: $rootScope});
    }));

    it('Should set active patient', inject(function ($controller, $rootScope) {
        var ctrl = $controller('PatientListController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.users = [{"id":1}];

        expect($rootScope.setActivePatient()).toBeUndefined();
    }));

    it('Should show patients, whom have prescriptions only for today without patients', inject(function ($controller, $rootScope, $filter) {
        var ctrl = $controller('PatientListController', {
            $scope: $rootScope, localStorageService: localStorage, $filter: $filter
        });
        $rootScope.patientList = [];

        expect($rootScope.showOnlyTodaysPatient()).toBeUndefined();
    }));

    it('Should show patients, whom have prescriptions only for today with patients', inject(function ($controller, $rootScope, $filter) {
        var ctrl = $controller('PatientListController', {
        	$scope: $rootScope, localStorageService: localStorage, $filter: $filter
        });
        $rootScope.users = [{"id":1}];
        $rootScope.patientList = [{"id":1}];

        var flag;
        $rootScope.buttonState;

        runs(function() {
            flag = false;

            $rootScope.buttonState = false;
            expect($rootScope.showOnlyTodaysPatient()).toBeUndefined();

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.buttonState = true;
            return flag;
        }, "buttonState should be === true", 750);

        runs(function() {
            expect($rootScope.showOnlyTodaysPatient()).toBeUndefined();
        });
    }));

});

describe('Decorate roles', function() {

    var localStorage,
        aux;

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

    beforeEach(function () {
        module("App");
    });

    beforeEach(inject(function ($injector) {
        aux = $injector.get('aux');
    }));
    
    it('Should show hint', inject(function () {
        aux.showHint();
    }));

    it('Should add to localStorage', inject(function () {
        aux.addToLocalStorage();
    }));

    it('Should get from localStorage', inject(function () {
        aux.getFromLocalStorage();
    }));

    it('Should clear localStorage', inject(function () {
        aux.clearLocalStorage();
    }));

    it('Should sort by alphabet', inject(function () {
        var personA = {first_name: true};
        var personB = {last_name: true};

        aux.sortByAlphabet(personA, personB);
    }));

    it('Should return date from UTC', inject(function () {
        var flag;
        var date;

        runs(function() {
            flag = false;
            date = new Date('2013-01-01');

            aux.getDateFromUTC(date);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            date = new Date('2013-10-10');
            return flag;
        }, "Should be > 9", 750);

        runs(function() {
            aux.getDateFromUTC(date);
        });
    }));

    it('Should return time from UTC', inject(function () {
        var flag;
        var time;

        runs(function() {
            flag = false;
            time = new Date('2013-01-01 01:01:01');

            aux.getTimeFromUTC(time);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            time = new Date('2013-01-01 2013-10-10');
            return flag;
        }, "Should be > 9", 750);

        runs(function() {
            aux.getTimeFromUTC(time);
        });
    }));
});

describe('Decorate roles', function() {

    var localStorage,
        roleDecorator;

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
        roleDecorator = $injector.get('roleDecorator');
    }));
    
    it('Should decorate for rights', inject(function () {
        var flag;
        var right;
        var func = function(){};

        runs(function() {
            flag = false;
            right = true;

            roleDecorator.decorateForRight(right, func)();

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            right = false;
            return flag;
        }, "Input text should not be empty", 750);

        runs(function() {
            roleDecorator.decorateForRight(right)();
        });
    }));
    
});

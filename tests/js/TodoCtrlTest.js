
describe('TodosCtrl', function() {

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

    it('test role in system', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.statusInSystem.name).toBe("Patient");
    }));

    it('can edit', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.updateTodo({text: "123", done: true})).toBeUndefined();
    }));

    it('remove Todo', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.removeTodo($rootScope.roles.user)).toBe(true);
    }));

    it('add new Todo', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        $rootScope.todoText = '';
        expect($rootScope.addNewTodo()).toBe(false);
    }));

});
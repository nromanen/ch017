describe('TodoController', function() {

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
        localStorage.add("currentUser", {first_name: true, role: {name: 'doctor', add: false, edit: false, remove: false, check: false}});
        //localStorageService.get("currentUser");
    });

    beforeEach(module('App'));

    it('Should initialize contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        /* here we need to test init()
        expect($rootScope.patientListHide).toBe(false);
         */
    }));

    it('Should update HTML5 Local Storage', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.updateLocalStorage()).toBeUndefined();
    }));

    it('Should add new DateTime to todo', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.addNewDateTimeToTodo()).toBeUndefined();
    }));


    it('Should check rights to add item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentUser = {role: {add: false}};

        expect($rootScope.canAddTodo()).toBe(false);
    }));

    it('Should check rights to edit item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentUser = {role: {edit: false}};

        expect($rootScope.canEditTodo()).toBe(false);
    }));

    it('Should check rights to remove item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentUser = {role: {remove: false}};

        expect($rootScope.canRemoveTodo()).toBe(false);
    }));

    it('Should check rights to check item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentUser = {role: {check: false}};

        expect($rootScope.canCheckTodo()).toBe(false);
    }));

    it('Should set active patient', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.setActivePatient()).toBeUndefined();
    }));

    it('Should change status in system', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var role = $rootScope.roles.nurse;

        expect($rootScope.changeStatusInSystem(role)).toBe(role);
    }));

    it('Should add item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var flag;

        runs(function() {
            flag = false;
            $rootScope.todoText = true;

            expect($rootScope.addNewTodo()).toBe(true);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.todoText = false;
            return flag;
        }, "Input text should not be empty", 750);

        runs(function() {
            expect($rootScope.addNewTodo()).toBe(false);
        });
    }));

    it('Should get number of active items', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var flag;
        var count;
        $rootScope.currentPatient = {todo: {}};

        runs(function() {
            flag = false;
            count = 0;
            $rootScope.currentPatient.todo.length = 0;

            expect($rootScope.getActiveTaskQuantity()).toBe(count);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            count = 1;
            $rootScope.currentPatient.todo.length = 1;
            return flag;
        }, "Should be some active items", 750);

        runs(function() {
            expect($rootScope.getActiveTaskQuantity()).toBe(count);
        });
    }));

    it('Should clear done items', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.todoList = [{done: true}];

        $rootScope.todoText = '';
        expect($rootScope.clearDoneTodos()).toBeUndefined();
    }));

    it('Should remove item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.removeTodo($rootScope.roles.user)).toBe(true);
    }));

    it('Should mark item as done', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.markDone()).toBe(undefined);
    }));

    it('Should edit item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.updateTodo({text: "123", done: true})).toBeUndefined();
    }));
});

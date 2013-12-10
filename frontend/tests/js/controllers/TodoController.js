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
        localStorage.add("currentUser", {role: {add: true, edit: true, remove: true, check: true}});
        //localStorageService.get("currentUser");
    });

    beforeEach(module('App'));

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
        localStorage.add("currentUser", {role: {add: true, edit: true, remove: true, check: true}});
        //localStorageService.get("currentUser");
    });

    it('Should initialize contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.todoExample = {};
/*
        $rootScope.todoExample.text = false;
        expect($rootScope.addNewTodo()).toBe(false);

        $rootScope.todoExample.text = true;
        expect($rootScope.addNewTodo()).toBeUndefined();
*/
    }));

    it('Should add new DateTime to todo', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.addNewDateTimeToTodo()).toBeUndefined();
    }));

    it('Should update HTML5 Local Storage', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {};
        $rootScope.users = [{"id": 1}, {"id": 2}];

        $rootScope.currentPatient.id = 1;
        expect($rootScope.updateLocalStorage()).toBeUndefined();

        $rootScope.currentPatient.id = 3;
        expect($rootScope.updateLocalStorage()).toBeUndefined();
    }));

    it('Should add new DateTime to todo', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.addNewDateTimeToTodo()).toBeUndefined();
    }));

    it('Should remove DateTime from todo', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.removeDateTimeTodo()).toBeUndefined();
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
        $rootScope.users = [{"id":1}];

        expect($rootScope.setActivePatient()).toBeUndefined();
    }));

    it('Should add item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {todo: []};
        $rootScope.todoExample = {};

        $rootScope.todoExample.text = false;
        expect($rootScope.addNewTodo()).toBe(false);

        $rootScope.todoExample.text = true;
        expect($rootScope.addNewTodo()).toBeUndefined();
    }));

    it('Should update item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {"todo": [{"id": 1}, {"id": 2}]};
        $rootScope.todoExample = {"id": 2};

        expect($rootScope.updateTodo()).toBeUndefined();
    }));

    it('Should get number of active items', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var flag;
        var count = 0;
        $rootScope.currentPatient = {"todo":[]};

        runs(function() {
            flag = false;

            expect($rootScope.getActiveTaskQuantity()).toEqual(0);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            count = 3;
            $rootScope.currentPatient = {"todo":[{},{},{}]};
            return flag;
        }, "Should action forEach to count active items", 750);

        runs(function() {
            runs(function() {
                flag = false;

                expect($rootScope.getActiveTaskQuantity()).toBe(count);

                setTimeout(function() {
                    flag = true;
                }, 500);
            });

            waitsFor(function() {
                count = 2;
                $rootScope.currentPatient = {"todo":[{done: true},{},{}]};
                return flag;
            }, "Should be some active items", 750);

            runs(function() {
                expect($rootScope.getActiveTaskQuantity()).toBe(count);
            });

            expect($rootScope.getActiveTaskQuantity()).toBe(count);
        });
    }));

    it('Should clear done items', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {todo: [{}]};

        $rootScope.currentPatient.todo[0].done = false;
        expect($rootScope.clearDoneTodos()).toBeUndefined();

        $rootScope.currentPatient.todo[0].done = true;
        expect($rootScope.clearDoneTodos()).toBeUndefined();
    }));

    it('Should prepare to remove', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var todo = {id: 1};
        var time = {id: 1};

        time.done = true;
        expect($rootScope.prepareToRemove(todo, time)).toBeUndefined();

        time.done = false;
        expect($rootScope.prepareToRemove(todo, time)).toBeUndefined();
    }));

    it('Should remove item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {"todo": [{
            "time": [
                {"id": 1, "time": ""},
                {"id": 2, "time": ""},
                {"id": 3, "time": ""}
            ], "id": 1}]};
        var todo = 1;
        var time = 1;

        expect($rootScope.removeTodo(todo, time)).toBeUndefined();
    }));
});

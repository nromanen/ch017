describe('TodoController', function() {

    var localStorage = {};
    var $httpBackend;

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

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'api/create_todo/1/').respond({});
        $httpBackend.when('PUT', 'api/update_todo/2/1/').respond({});
        $httpBackend.when('DELETE', 'api/delete_todo/1/1/').respond({});
    }));

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

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should initialize the contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.todoExample = {};
    }));

    it('Should update HTML5 Local Storage', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {};
        $rootScope.users = [{"id": 1}, {"id": 2}];

        $rootScope.currentPatient.id = 1;
        expect($rootScope.updateUserScope()).toBeUndefined();

        $rootScope.currentPatient.id = 3;
        expect($rootScope.updateUserScope()).toBeUndefined();
    }));

    it('Should get count of items, which needs to be done', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {todo: [{time: [{date: "11-12-2013"}]}]};

        expect($rootScope.getTodoAmount()).toBe(0);
    }));

    it('Should check rights to add item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentUser = {role: {add: false}};

        expect($rootScope.canAddTodo()).toBe(false);
    }));

    it('Should check rights to edit item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        $rootScope.currentUser = {role: {}};
        $rootScope.currentPatient = {todo: [{id: 1, time: [{id: 1, date: "11-12-2013", time: "00:00"}]}]};

        var flag;
        var todoID = $rootScope.currentPatient.todo[0].id;
        var timeID = $rootScope.currentPatient.todo[0].time[0].id;

        runs(function() {
            flag = false;

            $rootScope.currentUser.role.edit = false;
            expect($rootScope.canEditTodo(todoID, timeID)).toBe(false);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.currentUser.role.edit = true;
            return flag;
        }, "currentUser.role.edit should be === true", 750);

        runs(function() {
            expect($rootScope.canEditTodo(todoID, timeID)).toBe(false);
        });
    }));

    it('Should check rights to remove item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        $rootScope.currentUser = {role: {}};
        $rootScope.currentPatient = {todo: [{id: 1, time: [{id: 1, date: "11-12-2013", time: "00:00"}]}]};

        var flag;
        var todoID = $rootScope.currentPatient.todo[0].id;
        var timeID = $rootScope.currentPatient.todo[0].time[0].id;

        runs(function() {
            flag = false;

            $rootScope.currentUser.role.remove = false;
            expect($rootScope.canRemoveTodo(todoID, timeID)).toBe(false);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.currentUser.role.remove = true;
            return flag;
        }, "currentUser.role.remove should be === true", 750);

        runs(function() {
            expect($rootScope.canRemoveTodo(todoID, timeID)).toBe(false);
        });
    }));

    it('Should check rights to check item', inject(function ($controller, $rootScope, aux) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var flag;
        var date = aux.getDateFromUTC(new Date());
        var time = aux.getTimeFromUTC(new Date());
        $rootScope.currentUser = {role: {}};

        runs(function() {
            flag = false;

            $rootScope.currentUser.role.check = false;
            expect($rootScope.canCheckTodo(date, time)).toBe(false);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.currentUser.role.check = true;
            return flag;
        }, "currentUser.role.check should be === true", 750);

        runs(function() {
            expect($rootScope.canCheckTodo(date, time)).toBe(true);
        });
    }));

    it('Should add item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        $rootScope.currentPatient = {id: 1, todo: []};
        $rootScope.currentUser = {id: 1};
        $rootScope.todoExample = {};

        var flag;
        $rootScope.canAddTodo;
        $rootScope.todoExample.text;

        runs(function() {
            flag = false;

            $rootScope.canAddTodo = false;
            $rootScope.todoExample.text = false;
            expect($rootScope.addNewTodo()).toBe(false);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.canAddTodo = true;
            $rootScope.todoExample.text = true;
            return flag;
        }, "canAddTodo and todoExample.text should be === true", 750);

        runs(function() {
            $httpBackend.expectPOST('api/create_todo/1/');
            expect($rootScope.addNewTodo()).toBeUndefined();
            $httpBackend.flush();
        });
    }));

    it('Should update item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        $rootScope.currentPatient = {id: 1, "todo": [{"id": 1}, {"id": 2}]};
        $rootScope.currentUser = {id: 1};
        $rootScope.todoExample = {id: 2};

        var flag;
        $rootScope.canEditTodo;

        runs(function() {
            flag = false;

            $rootScope.canEditTodo = true;
            expect($rootScope.updateTodo()).toBeUndefined();

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.canEditTodo = false;
            return flag;
        }, "canEditTodo should be === false", 750);

        runs(function() {
            expect($rootScope.updateTodo()).toBe(false);
            $httpBackend.flush();
        });
    }));

    it('Should clear done items', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        $rootScope.currentPatient = {
            todo: [
                {id: 1, time: [{id: 1, date: '2013-12-12', time: '12:12:12', done: false}]},
                {id: 2, time: [{id: 2, date: '2013-12-13', time: '14:12:12', done: true}]}
            ]
        };
        var patientId = $rootScope.currentPatient.todo[0].id;
        var timeId = $rootScope.currentPatient.todo[0].time[0].id;
        $rootScope.currentUser = {id: 1}

        var flag;
        $rootScope.canRemoveTodo;

        runs(function() {
            flag = false;

            $rootScope.canRemoveTodo = false;
            expect($rootScope.removeTodo(patientId, timeId)).toBe(false);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.canRemoveTodo = false;
            return flag;
        }, "canRemoveTodo should be === trye", 750);

        runs(function() {
            expect($rootScope.removeTodo(patientId, timeId)).toBe(false);
        });
    }));

    it('Should prepare to remove', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var todo = {id: 2};
        var time = {id: 1};

        time.done = true;
        $rootScope.currentUser = {id: 1};


        $httpBackend.expectPUT('api/update_todo/2/1/');
        expect($rootScope.prepareToRemove(todo, time)).toBeUndefined();
        $httpBackend.flush();

        time.done = false;
        $httpBackend.expectPUT('api/update_todo/2/1/');
        expect($rootScope.prepareToRemove(todo, time)).toBeUndefined();
        $httpBackend.flush();
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

        $rootScope.currentUser = {id: 1}
        $httpBackend.expectDELETE('api/delete_todo/1/1/');
        expect($rootScope.removeTodo(todo, time)).toBeUndefined();
        $httpBackend.flush();
    }));
});

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

    it('check can user add new todo by default', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        $rootScope.todoText = '';
        expect($rootScope.canAddTodo()).toBe(false);
    }));

    it('Should check rights to edit item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.canEditTodo()).toBe(false);
    }));
    
    it('Should check rights to remove item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.canRemoveTodo()).toBe(false);
    }));
    
    it('Should check rights to check item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.canCheckTodo()).toBe(false);
    }));
    
    it('Should mark item as done', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.markDone()).toBe(undefined);
    }));

    it('Should change status in system', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});
        var role = $rootScope.roles.nurse;
        
        expect($rootScope.changeStatusInSystem(role)).toBe(role);
    }));

    it('Should add new item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});
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
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});
        var flag;
        var count;

        runs(function() {
            flag = false;
            count = 0;
            $rootScope.todoList = [{done: true}];

            expect($rootScope.getActiveTaskQuantity()).toBe(count);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            count = 1;
            $rootScope.todoList = [{done: false}];
            return flag;
        }, "Should be some active items", 750);

        runs(function() {
            expect($rootScope.getActiveTaskQuantity()).toBe(count);
        });
    }));

    it('Check func for clear done todos', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.todoList = [{done: true}];
        
        $rootScope.todoText = '';
        expect($rootScope.clearDoneTodos()).toBeUndefined();
    }));
    it('Roles in system', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

	var rolestest = {
            doctor: {name: "Doctor", rights: {add: true, remove: true, check: true, edit: true}},
            nurse: {name: "Nurse", rights: {add: true, remove: false, check: true, edit: false}},
            patient: {name: "Patient", rights: {add: false, remove: false, check: false, edit: false}}
        };

        expect($rootScope.roles).toEqual(rolestest);
    }));

    describe('Validate Roles in system', function() {
       it('Validate doctor ', inject(function ($controller, $rootScope) {
          var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

          $rootScope.statusInSystem = $rootScope.roles.doctor;
          expect($rootScope.canAddTodo()).toBe(true);
          expect($rootScope.canEditTodo()).toBe(true);
          expect($rootScope.canRemoveTodo()).toBe(true);
          expect($rootScope.canCheckTodo()).toBe(true);
       }));
       it('Validate nurse ', inject(function ($controller, $rootScope) {
          var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

          $rootScope.statusInSystem = $rootScope.roles.nurse;
          expect($rootScope.canAddTodo()).toBe(true);
          expect($rootScope.canEditTodo()).toBe(false);
          expect($rootScope.canRemoveTodo()).toBe(false);
          expect($rootScope.canCheckTodo()).toBe(true);
       }));
       it('Validate patient ', inject(function ($controller, $rootScope) {
          var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

          $rootScope.statusInSystem = $rootScope.roles.patient;
          expect($rootScope.canAddTodo()).toBe(false);
          expect($rootScope.canEditTodo()).toBe(false);
          expect($rootScope.canRemoveTodo()).toBe(false);
          expect($rootScope.canCheckTodo()).toBe(false);
       }));


    });


    it('count ActiveTask', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoCtrl', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.getActiveTaskQuantity()>=0).toBe(true);
    }));

    

});

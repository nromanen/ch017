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
        localStorage.add("currentUser", {role: {add: false, edit: false, remove: false, check: false}});
        //localStorageService.get("currentUser");
    });

    beforeEach(module('App'));

    it('Should initialize contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.todoExample = {};

        $rootScope.todoExample.text = false;
        expect($rootScope.addNewTodo()).toBe(false);

        $rootScope.todoExample.text = true;
        expect($rootScope.addNewTodo()).toBeUndefined();
    }));

    it('Should add new DateTime to todo', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});

        expect($rootScope.addNewDateTimeToTodo()).toBeUndefined();
    }));

    it('Should update HTML5 Local Storage', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.users = [{"first_name":"Craig","last_name":"Ozz","access_token":"CraigOzz","foto":"fotos/FIFA1221-51x51.jpg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient5","todo":[{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":7},{"first_name":"Elma","last_name":"Harry","access_token":"ElmaHarry","foto":"fotos/282d1ba64e43854190124147f175b188.jpeg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient2","todo":[{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":4},{"first_name":"Evan","last_name":"Olister","access_token":"EvanOlister","foto":"fotos/man.jpg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient7","todo":[{"date_finished":"2013-11-23T05:18:57","text":"todo n2","amount":1,"done":false,"time":[{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:19:00.912"},{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":9},{"first_name":"Leonardo","last_name":"Vinci","access_token":"Patient","foto":"fotos/images-4.jpg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient1","todo":[{"date_finished":"2013-11-23T05:18:43","text":"todo n1","amount":1,"done":false,"time":[{"time":"2013-11-23T05:18:04"},{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:18:52.505"},{"date_finished":"2013-11-23T05:18:57","text":"todo n2","amount":1,"done":false,"time":[{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:19:00.912"},{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":3},{"first_name":"Liza","last_name":"Shelon","access_token":"LizaShelon","foto":"fotos/5d530c569a8536e33dfb9c0fb3300d17.jpeg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient8","todo":[{"date_finished":"2013-11-23T05:18:43","text":"todo n1","amount":1,"done":false,"time":[{"time":"2013-11-23T05:18:04"},{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:18:52.505"},{"date_finished":"2013-11-23T05:18:57","text":"todo n2","amount":1,"done":false,"time":[{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:19:00.912"}],"id":10},{"first_name":"Marry","last_name":"Summer","access_token":"MarrySummer","foto":"fotos/87debccac4f47f3839bd6759e31998ad.jpeg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient9","todo":[{"date_finished":"2013-11-23T05:18:43","text":"todo n1","amount":1,"done":false,"time":[{"time":"2013-11-23T05:18:04"},{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:18:52.505"},{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":11},{"first_name":"Rick","last_name":"Miller","access_token":"RickMiller","foto":"fotos/perello_ibarionex_e.jpg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient3","todo":[{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":5},{"first_name":"Samuel","last_name":"Didi","access_token":"SamuelDidi","foto":"fotos/myqd1t3h_5bf4_0_51.jpg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient10","todo":[{"date_finished":"2013-11-23T05:18:43","text":"todo n1","amount":1,"done":false,"time":[{"time":"2013-11-23T05:18:04"},{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:18:52.505"},{"date_finished":"2013-11-23T05:18:57","text":"todo n2","amount":1,"done":false,"time":[{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:19:00.912"},{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":12},{"first_name":"Vilma","last_name":"Graice","access_token":"VilmaGraice","foto":"fotos/smith_dori_e.jpg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient4","todo":[{"date_finished":"2013-11-23T05:19:07","text":"todo n3","amount":1,"done":false,"time":[{"time":"2013-11-25T00:00:00"}],"date_created":"2013-11-23T05:19:09.520"}],"id":6},{"first_name":"Wilhelm","last_name":"Adler","access_token":"WilhelmAdler","foto":"fotos/845.thumbnail.jpg","role":{"edit":false,"add":false,"name":"patient","remove":false,"check":false},"login":"patient6","todo":[{"date_finished":"2013-11-23T05:18:57","text":"todo n2","amount":1,"done":false,"time":[{"time":"2013-11-24T12:00:00"}],"date_created":"2013-11-23T05:19:00.912"}],"id":8}];

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

    xit('Should add item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var flag;
        $rootScope.currentPatient = {todo: []};
        $rootScope.todoExample = {
            text: '',
            done: false,
            todo: []
        };

        runs(function() {
            flag = false;
            $rootScope.todoExample.text = false;

            expect($rootScope.addNewTodo()).toBe(false);

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.todoExample.text = true;
            return flag;
        }, "Input text should not be empty", 750);

        runs(function() {
            expect($rootScope.addNewTodo()).toBeUndefined();
        });
    }));

    it('Should update item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        $rootScope.currentPatient = {todo: [{}, {}]};
        $rootScope.todoExample = {
            text: '',
            done: false,
            todo: [{}, {}]
        };

        $rootScope.todoExample.id = 0;
        $rootScope.currentPatient.todo[0].id = 1;
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

    it('Should remove item', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TodoController', {$scope: $rootScope, localStorageService: localStorage});
        var index = 0;
        $rootScope.currentPatient = {todo: [{id: 0}]};

        expect($rootScope.removeTodo(index)).toBeUndefined();
    }));
});

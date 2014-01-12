describe('Database factory', function() {

    var localStorage, db;
    var $httpBackend;

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

    beforeEach(inject(function($rootScope) {
        $rootScope.currentUser = {
            id: 1,
            login: 'doctor',
            password: '1111',
            role: {
                add: true,
                edit: true,
                remove: true,
                check: true}
        };
        $rootScope.todoExample = {
            edit: false,
            text: '',
            done: false,
            time: []
        };
        $rootScope.currentPatient = {id: 1, "todo": [{"id": 1}, {"id": 2}]};
    }));

    beforeEach(inject(function ($injector) {
        db = $injector.get('db');
    }));

     beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'api/user/doctor/MTExMQ==/').respond({role: {name: 'Doctor'}, login: 'doctor'});
        $httpBackend.when('GET', 'api/users_by_role/patient/').respond([1, 2, 3]);
        $httpBackend.when('POST', 'api/create_todo/1/').respond({});
        $httpBackend.when('PUT', 'api/update_todo/1/1/').respond({});
        $httpBackend.when('DELETE', 'api/delete_todo/1/1/').respond({});
    }));

    it('Should get user data', inject(function($rootScope) {
        var login = $rootScope.currentUser.login;
        var password = $rootScope.currentUser.password;

        $httpBackend.expectGET('api/user/doctor/MTExMQ==/');
        db.getUserData(login, password);
        $httpBackend.flush();
    }));

    it('Should get patient list', inject(function($rootScope) {
        $httpBackend.expectGET('api/users_by_role/patient/');
        db.getPatientList($rootScope.currentUser);
        $httpBackend.flush();
    }));

    it('Should add todo', inject(function($rootScope) {
        var id = $rootScope.currentPatient.id;
        var object = $rootScope.currentPatient.todo;

        $httpBackend.expectPOST('api/create_todo/1/');
        db.addTodo(id, object);
        $httpBackend.flush();
    }));

    it('Should edit todo', inject(function($rootScope) {
        var object = $rootScope.currentPatient;

        $httpBackend.expectPUT('api/update_todo/1/1/');
        db.editTodo(object);
        $httpBackend.flush();
    }));

    it('Should delete todo', inject(function($rootScope) {
        var id = $rootScope.currentPatient.todo[0].id;

        $httpBackend.expectDELETE('api/delete_todo/1/1/');
        db.deleteTodo(id);
        $httpBackend.flush();
    }));
});

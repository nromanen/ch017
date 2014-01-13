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
        $httpBackend.when('GET', 'api/user/doctor/MTExMQ==/');
        $httpBackend.when('GET', 'api/users_by_role/patient/');
        $httpBackend.when('POST', 'api/create_todo/1/');
        $httpBackend.when('PUT', 'api/update_todo/1/1/');
        $httpBackend.when('DELETE', 'api/delete_todo/1/1/');
        $httpBackend.when('GET', 'api/medicines/');
    }));

    it('Should get user data', inject(function($rootScope) {
        var login = $rootScope.currentUser.login;
        var password = $rootScope.currentUser.password;
        var flag;
        var flag1;
        var user = $rootScope.currentUser;

        user.result = true;
        $httpBackend.expectGET('api/user/doctor/MTExMQ==/').respond(201, user);
        db.getUserData(login, password);

        user.result = false;
        $httpBackend.expectGET('api/user/doctor/MTExMQ==/').respond(201, user);
        db.getUserData(login, password);

        user.is_staff = false;
        $httpBackend.expectGET('api/user/doctor/MTExMQ==/').respond(201, user);
        db.getUserData(login, password);

        $httpBackend.expectGET('api/user/doctor/MTExMQ==/').respond(404, {});
        db.getUserData(login, password);
        $httpBackend.flush();
    }));

    it('Should get patient list', inject(function($rootScope) {
        $httpBackend.expectGET('api/users_by_role/patient/').respond(201, [1, 2, 3]);
        db.getPatientList($rootScope.currentUser);
        $httpBackend.expectGET('api/users_by_role/patient/').respond(404, {});
        db.getPatientList($rootScope.currentUser);
        $httpBackend.flush();
    }));

    it('Should add todo', inject(function($rootScope) {
        var id = $rootScope.currentPatient.id;
        var object = $rootScope.currentPatient.todo;

        $httpBackend.expectPOST('api/create_todo/1/').respond(201, '');
        db.addTodo(id, object);
        $httpBackend.expectPOST('api/create_todo/1/').respond(404, '');
        db.addTodo(id, object);
        $httpBackend.flush();
    }));

    it('Should edit todo', inject(function($rootScope) {
        var object = $rootScope.currentPatient;

        $httpBackend.expectPUT('api/update_todo/1/1/').respond(201, '');
        db.editTodo(object);
        $httpBackend.expectPUT('api/update_todo/1/1/').respond(404, '');
        db.editTodo(object);
        $httpBackend.flush();
    }));

    it('Should delete todo', inject(function($rootScope) {
        var id = $rootScope.currentPatient.todo[0].id;

        $httpBackend.expectDELETE('api/delete_todo/1/1/').respond(201, '');
        db.deleteTodo(id);
        $httpBackend.expectDELETE('api/delete_todo/1/1/').respond(404, '');
        db.deleteTodo(id);
        $httpBackend.flush();
    }));

    it('Should get medicines', inject(function($rootScope) {
        $httpBackend.expectGET('api/medicines/').respond(201, '');
        db.getMedicines();
        $httpBackend.expectGET('api/medicines/').respond(404, '');
        db.getMedicines();
        $httpBackend.flush();
    }));
});

describe('Database factory', function() {

    var localStorage,
        db;

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
        db = $injector.get('db');
    }));

    beforeEach(inject(
        ['$httpBackend', function($h) {
            $httpBackend = $h;
            $httpBackend.whenJSONP('http://localhost:8000/api/todos/' +
                '?callback=JSON_CALLBACK&method=POST&id=1&object={}').respond();
            $httpBackend.whenJSONP('http://localhost:8000/api/todos/' +
                '?callback=JSON_CALLBACK&method=PUT&id=1&object={}').respond();
            $httpBackend.whenJSONP('http://localhost:8000/api/todos/' +
                '?callback=JSON_CALLBACK&method=DELETE&id=1').respond();
        }]
    ));

    it('Should get user data', inject(function () {
        var login = 'doctor';
        var password = '1111';

        db.getUserData(login, password);
    }));

    it('Should get patient list', inject(function () {
        db.getPatientList();
    }));

    it('Should add todo', inject(function () {
        var id = 1;
        var object = {};

        db.addTodo(id, object);
    }));

    it('Should edit todo', inject(function () {
        var object = {};

        db.editTodo(object);
    }));

    it('Should delete todo', inject(function () {
        var id = 1;

        db.deleteTodo(id);
    }));
});

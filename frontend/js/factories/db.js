
App.factory('db', function($rootScope, $http, config, aux) {
    return {

        getUserData: function(login, password) {
            var password = btoa(password);
            var path = config.serverUrl + config.apiUrl;
            var queryUrl = path + 'user/' + login + '/' + password + '/' + config.jsonpCallback;

            $http.jsonp(queryUrl).
            success(function(data, status) {

                if (data.result === false) {
                    aux.showHint('hintText', data.error);
                    return false;
                }

                aux.addToLocalStorage('currentUser', data);

                aux.redirectTo( '/' + data.role.name + '/' + data.login );

            }).
            error(function(data, status) {
                aux.showHint('hintText', data.error);
            });
        },

        getPatientList: function() {
            var queryUrl = config.serverUrl + config.apiUrl + 'users_by_role/patient/' + config.jsonpCallback;

            return (
                $http.jsonp(queryUrl).
                success(function(data, status) {

                    data.sort(aux.sortByAlphabet);
                    $rootScope.patientList = data;
                    aux.addToLocalStorage('users', data);

                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
               })
            );
        },

        addTodo: function(currentPatient, id, object) {

            var queryUrl = config.serverUrl + config.apiUrl + 'todos/' +
                           config.jsonpCallback +
                           '&method=POST' +
                           '&id=' + id +
                           "&user_id=" + $rootScope.currentUser.id +
                           '&data=' + JSON.stringify(object);

            $http.jsonp(queryUrl).
                success(function(data) {

                    object.id = data.todo_id;
                    $rootScope.currentPatient.todo.push(object);
                    return true;

                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
                });
        },

        editTodo: function(object) {
            object = JSON.stringify(object);

            var queryUrl = config.serverUrl + config.apiUrl + 'todos/' +
                config.jsonpCallback +
                '&method=PUT' +
                "&user_id=" + $rootScope.currentUser.id +
                '&data=' + object;

            $http.jsonp(queryUrl).
                success(function() {
                    return true;
                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
                });
        },

        deleteTodo: function(id) {
            var queryUrl = config.serverUrl + config.apiUrl + 'todos/' +
                config.jsonpCallback +
                '&method=DELETE' +
                "&user_id=" + $rootScope.currentUser.id +
                '&id=' + id;

            $http.jsonp(queryUrl).
                success(function() {
                    return true;
                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
                });
        },

        getMedicines: function() {
            var queryUrl = config.serverUrl + config.apiUrl + 'medicines/' + config.jsonpCallback;

            return (
                $http.jsonp(queryUrl).
                success(function(data, status) {

                    $rootScope.medicines = data;
                    aux.addToLocalStorage('medicines', data);

                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
               })
            );
        }

    }
});

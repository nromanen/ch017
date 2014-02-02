App.factory('db', function($rootScope, $http, config, aux, $translate) {
    return {

        getUserData: function(login, password) {
            var self = this;
            var password = btoa(password);
            var queryUrl = config.apiUrl + 'user/' + login + '/' + password + '/';

            $http.get(queryUrl).
            success(function(user, status) {

                if (user.result === false) {
                    aux.showHint('hintText', $translate(user.error));
                    return false;
                }

                aux.addToLocalStorage('currentUser', user);

                if (user.is_staff) {
                    self.getPatientList(user);
                    return false;
                }

                aux.redirectTo( '/' + user.role.name + '/' + user.login );
            }).
            error(function(data, status) {
                aux.showHint('hintText', data.error);
            });
        },

        getPatientList: function(currentUser) {
            var queryUrl = config.apiUrl + 'users_by_role/patient/';

            $http.get(queryUrl).
            success(function(data, status) {

                data.sort(aux.sortByAlphabet);
                $rootScope.patientList = data;
                aux.addToLocalStorage('users', data);
                aux.redirectTo( '/' + currentUser.role.name + '/' + currentUser.login );

            }).
            error(function(data, status) {
                aux.redirectTo( '/error/' + status );
           });
        },

        addTodo: function(id, object) {
            var queryUrl = config.apiUrl + 'create_todo/' + $rootScope.currentUser.id + '/';
            var param = {
                patient_id: id,
                data: JSON.stringify(object)
            };

            $http({ method: 'POST', url: queryUrl, data: param }).
                success(function(data) {

                    object.id = data.todo_id;
                    object.time.forEach(function(element, index) {
                        element.id = data.time_ids[index];
                    });
                    $rootScope.currentPatient.todo.push(object);
                    return true;

                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
                });
        },

        editTodo: function(object) {
            var queryUrl = config.apiUrl + 'update_todo/' + object.id + '/' + $rootScope.currentUser.id + '/';
            var param = {
                data: JSON.stringify(object)
            };

            $http({ method: 'PUT', url: queryUrl, data: param }).
                success(function() {
                    return true;
                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
                });
        },

        deleteTodo: function(id) {
            var queryUrl = config.apiUrl + 'delete_todo/' + id + '/' + $rootScope.currentUser.id + '/';

            $http.delete(queryUrl).
                success(function() {
                    return true;
                }).
                error(function(data, status) {
                    aux.redirectTo( '/error/' + status );
                });
        },

        getMedicines: function() {
            var queryUrl = config.apiUrl + 'medicines/';

            return (
                $http.get(queryUrl).
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
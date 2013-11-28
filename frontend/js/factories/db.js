App.factory("db", function($rootScope, localStorageService, $http, $location, config) {
    function hint (str) {
        $rootScope.hintText = str;
    }

    function saveRole (data) {
        localStorageService.add('currentUser', data);
    }

    function redirectTo (redirectUrl) {
        $location.path(redirectUrl);
    }

    return {
        getUserData: function (login, password) {
            var password = btoa(password);
            var path = config.serverUrl + config.apiUrl;
            var url = path + 'user/' + login + '/' + password + '/?callback=JSON_CALLBACK';

            $http.jsonp( url ).
            success(function(data, status) {

                if (data.result === false) {
                    hint(data.error);
                    return false;
                }

                saveRole(data);

                redirectTo( '/' + data.role.name + '/' + data.login );

            }).
            error(function(data, status) {
                hint(data.error);
            });
        }
    }
});

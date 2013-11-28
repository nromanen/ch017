App.factory("aux", function($rootScope, localStorageService, $location) {
    return {

        showHint: function (key, value) {
            $rootScope[key] = value;
        },

        addToLocalStorage: function (key, value) {
            localStorageService.add(key, value);
        },

        redirectTo: function (url) {
            $location.path(url);
        }

    }
});

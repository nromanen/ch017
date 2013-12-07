App.factory("aux", function($rootScope, localStorageService, $location) {
    return {

        showHint: function (key, value) {
            $rootScope[key] = value;
        },

        addToLocalStorage: function (key, value) {
            localStorageService.add(key, value);
        },

        getFromLocalStorage: function (key) {
            return localStorageService.get(key);
        },

        clearLocalStorage: function () {
            localStorageService.clearAll();
        },

        redirectTo: function (url) {
            $location.path(url);
        },

        sortByAlphabet: function (personA, personB) {
            return personA.first_name > personB.first_name;
        },

        getDateFromUTC: function (str) {
            var year = str.getFullYear();
            var month = str.getMonth() + 1;
            var date = str.getDate();

            if(month < 10) month = 0 + month.toString();
            if(date < 10) date = 0 + date.toString();

            return year + '-' + month + '-' + date;
        },

        getTimeFromUTC: function (str) {
            var hour = str.getHours();
            var minute = str.getMinutes();
            var second = str.getSeconds();

            if(hour < 10) hour = 0 + hour.toString();
            if(minute < 10) minute = 0 + minute.toString();
            if(second < 10) second = 0 + second.toString();

            return hour + ':' + minute + ':' + second;
        }

    }
});

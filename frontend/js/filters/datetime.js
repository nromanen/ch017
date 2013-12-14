
App.filter('morning', ['dayPart', function(dayPart) {

    return function(times,  $scope) {
        if (!times.length) return false;

        var filteredTimes = times.filter(function(timeItem) {
            return timeItem.time.split(':')[0] < dayPart.noon &&
                timeItem.time.split(':')[0] >= dayPart.morning;
        });

        return filteredTimes;

    };
}]).filter('noon', ['dayPart', function(dayPart) {

    return function(times, $scope) {
        if (!times.length) return false;

        var filteredTimes = times.filter(function(timeItem) {
            return timeItem.time.split(':')[0] >= dayPart.noon &&
                timeItem.time.split(':')[0] < dayPart.evening;
        });

        return filteredTimes;
    };
}]).filter('evening', ['dayPart', function(dayPart) {

    return function(times, $scope) {
        if (!times.length) return false;

        var filteredTimes = times.filter(function(timeItem) {
            return timeItem.time.split(':')[0] >= dayPart.evening;
        });

        return filteredTimes;
    };
}]);

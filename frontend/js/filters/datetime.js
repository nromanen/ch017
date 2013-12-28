
App.filter('morning', ['dayPart', function(dayPart) {

    return function(times, $scope) {
        if (!times.length) return false;

        return times.filter(function(timeItem) {
            return timeItem.time.split(':')[0] < dayPart.noon && 
                   timeItem.time.split(':')[0] >= dayPart.morning;
        });
    };

}]).filter('noon', ['dayPart', function(dayPart) {

    return function(times, $scope) {
        if (!times.length) return false;

        return times.filter(function(timeItem) {
            return timeItem.time.split(':')[0] >= dayPart.noon && 
                   timeItem.time.split(':')[0] < dayPart.evening;
        });
    };

}]).filter('evening', ['dayPart', function(dayPart) {

    return function(times, $scope) {
        if (!times.length) return false;

        return times.filter(function(timeItem) {
            return timeItem.time.split(':')[0] >= dayPart.evening;
        });
    };

}]);

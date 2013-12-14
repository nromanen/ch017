
App.filter('morning', ['dayPart', function(dayPart) {

    return function(time) {
        if (!time.length) return false;

        return time.filter(function(timeItem) {
            return timeItem.time.split(':')[0] < dayPart.noon &&
                timeItem.time.split(':')[0] >= dayPart.morning;
        });

    };
}]).filter('noon', ['dayPart', function(dayPart) {

    return function(time) {
        if (!time.length) return false;

        return time.filter(function(timeItem) {
            return timeItem.time.split(':')[0] >= dayPart.noon &&
                timeItem.time.split(':')[0] < dayPart.evening;
        });
    };
}]).filter('evening', ['dayPart', function(dayPart) {

    return function(time) {
        if (!time.length) return false;

        return time.filter(function(timeItem) {
            return timeItem.time.split(':')[0] >= dayPart.evening;
        });
    };
}]);

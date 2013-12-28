
App.directive('keywatcher', function($rootScope) {

    this.setElement = function($scope, elements) {
        $scope.$apply(function() {
           $rootScope.todoExample.text = elements.filter('.active').text().trim();
        });
    };

    this.selectPrevElement = function(elements) {
        if (elements.filter('.active').prev().length !== 0) {
            elements.filter('.active').removeClass('active').prev().addClass('active');
            return;
        }

        elements.first().removeClass('active');
        elements.last().addClass('active');
    };

    this.selectNextElement = function(elements) {
        if (elements.filter('.active').next().length !== 0) {
            elements.filter('.active').removeClass('active').next().addClass('active');
            return;
        }

        elements.last().removeClass('active');
        elements.first().addClass('active');
    };

    return function($scope, element) {
        element.on('keydown', function(event) {
            var elements = $('.modalwindow_description-hint ul li');
            var event = event || window.event;

            if(event.keyCode === 13) setElement($scope, elements); /* Enter */
            if(event.keyCode === 38) selectPrevElement(elements); /* Up-arrow */
            if(event.keyCode === 40) selectNextElement(elements); /* Down-arrow */
        });
    };

});

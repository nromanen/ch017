describe('TopPanelController', function() {

    beforeEach(module('App'));

    it('Should initialize contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TopPanelController', {$scope: $rootScope, localStorageService: localStorage});
    }));

});

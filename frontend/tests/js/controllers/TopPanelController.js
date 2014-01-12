describe('TopPanelController', function() {

    beforeEach(module('App'));

    it('Should initialize the contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TopPanelController', {$scope: $rootScope, localStorageService: localStorage});
    }));

    it('Should chahge language', inject(function ($controller, $rootScope) {
        var ctrl = $controller('TopPanelController', {$scope: $rootScope, localStorageService: localStorage});
        var lang = 'ru';

        expect($rootScope.changeLang(lang)).toBeUndefined();
    }));
});

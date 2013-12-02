describe('PatientListController', function() {

    beforeEach(module('App'));

    it('Should initialize contorller', inject(function ($controller, $rootScope) {
        var ctrl = $controller('PatientListController', {});
    }));

});

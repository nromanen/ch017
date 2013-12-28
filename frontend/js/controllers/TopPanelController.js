
App.controller('TopPanelController', function($scope, $translate, $rootScope, aux) {

    $scope.languagesList = ['en', 'ru', 'ua'];

    $scope.changeLang = function(lang) {
        $translate.uses(lang);
        $rootScope.lang = lang;
    };

});

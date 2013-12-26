
App.controller('TopPanelController', function($scope, $translate, $rootScope) {

    $scope.languagesList = ['en', 'ru', 'ua'];

    $scope.changeLang = function(lang) {
        $translate.uses(lang);
        $rootScope.lang = lang;
    };

});

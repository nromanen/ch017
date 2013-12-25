
App.controller("TopPanelController", function($scope, $translate) {

    $scope.languagesList = ['en', 'ru', 'ua'];

    $scope.changeLang = function(lang) {
        $translate.uses(lang);
    }

});

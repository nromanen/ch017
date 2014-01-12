
App.directive('modal', function($rootScope, db, aux) {
    return {
        restrict: 'E',
        templateUrl: './templates/modalWindow.html',
        link: function() {
            $('#myModal').on('shown.bs.modal', function(e) {
                $('[ng-model="todoExample.text"]').focus();
            });

            $rootScope.currentTime = aux.getTimeFromUTC(new Date());
        }
    }
});

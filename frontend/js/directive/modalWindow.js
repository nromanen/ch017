
App.directive('modal', function($rootScope, db, aux) {
    return {
        restrict: 'E',
        templateUrl: './templates/modalWindow.html',
        link: function($scope) {
            $('#myModal').on('shown.bs.modal', function(e) {
                $('[ng-model="todoExample.text"]').focus();
            });

            $('#myModal').on('hidden.bs.modal', function(e) {
                $rootScope.dateArr = [];
                $rootScope.timeArr = [];
            });

            $rootScope.currentTime = aux.getTimeFromUTC(new Date());
        }
    }
});

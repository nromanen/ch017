App.directive('buttonState', ['$rootScope', function($rootScope) {
    return {
        link: function($scope, element, attrs) {
            if ($rootScope.todayPatients.length === 0) $(element).addClass("disabled");

            element.on('click', function() {
                $scope.$apply(function() {
                    if (!$scope.buttonState) {
                        $(element).removeClass("active");
                        $(".patient-list .dropdown").fadeOut(150, function() {
                            $(".patient-list .dropdown").fadeIn(150);
                        });
                    } else {
                        $(element).addClass("active");
                        $(".patient-list .dropdown").fadeOut(150, function() {
                            $(".patient-list .dropdown").fadeIn(150);
                        });
                    }
                });
            });
        }
    }
}]);
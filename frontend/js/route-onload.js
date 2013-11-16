function routeOnLoad($rootScope, localStorageService, $http, $location) {
    
        $http({
            method: 'GET', 
            url: 'backend/get-user.json', 
            data: {'login': localStorageService.get('userLogin')}
        }).
        success(function(data, status, headers, config) {
            
			/* ***I NEED FROM SERVER***
			if(login === false) return data = {"result":false};
			if(login === true) return data = {"login":"IvanPupkin","name":"Ivan Pupkin","rights":{"add":false,"remove":false,"check":false,"edit":false}};
			*** */
            
            if (status !== 200) {
                /* $rootScope.hint.show( AUTH_ERROR.SERVER, 'red' ); */
                return false;
            }
            
            if (data.result === false) {
                $location.path('/auth');
                return false;
            }
            
            $rootScope.statusInSystem = data; /* !!! Here we will need to save 'statusInSystem' in the $scope !!! */
            $location.path( '/' + data.type + '/' + data.login );
        }).
        error(function(data, status, headers, config) {
            /* $rootScope.hint.show( AUTH_ERROR.SERVER, 'red' ); */
        });
        
}

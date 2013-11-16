function routeOnLoad($rootScope, localStorageService, $http, $location) {
    
    $rootScope.checkServerAnswer = function(status, result) {
        if (status !== 200) {
            $rootScope.redirectTo( '/error/' + status );
            return false;
        }
        
        if (result === false) {
            $rootScope.redirectTo('/auth');
            return false;
        }
        
        return true;
    }
    
    $rootScope.saveStatusInSystem = function(data) {
        $rootScope.statusInSystem = data; /* !!! Here we will need to save 'statusInSystem' in the $scope !!! */
        
        return true;
    }
    
    $rootScope.redirectTo = function(url) {
        $location.path( url );
    }
    
    $rootScope.getUserData = function() {
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
            
            if ($rootScope.checkServerAnswer(status, data.result) === false) return false;
            
            $rootScope.saveStatusInSystem(data);
            
            $rootScope.redirectTo( '/' + data.type + '/' + data.login );
        }).
        error(function(data, status, headers, config) {
            $rootScope.redirectTo( '/error/' + status );
        });
        
        return true;
    }
}

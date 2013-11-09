function controller($scope, localStorageService) {
    $scope.initController = function() {
        if(localStorageService.get('lists') === null) {
            $scope.lists = Array();
        } else {
            $scope.lists = localStorageService.get('lists');
        }
        
        return true;
    }
    
    $scope.putInList = function() {
        var listId;
        var showCheckboxBool;
        var hideDelImgBool;
        
        if(localStorageService.get('option_onlyView') == 1) {
            showCheckboxBool = false;
            hideDelImgBool = true;
        } else {
            showCheckboxBool = true;
            hideDelImgBool = false;
        }
        
        var item = {name: $scope.inputText,
                    archive: false,
                    show: true,
                    showDelImg: false,
                    showCheckbox: showCheckboxBool,
                    hideDelImg: hideDelImgBool};
        $scope.lists.push( item );
        updateLocalStorageLists();
        $scope.inputText = "";
    }
    
    $scope.hover = function(list) {
        return list.showDelImg = ! list.showDelImg;
    };
    
    $scope.deleteItem = function(list) {
        var listId = $scope.lists.indexOf(list);
        $scope.lists.splice(listId, 1);
        updateLocalStorageLists();
    };
    
    $scope.initArchive = function() {
        $scope.itemArchiveStyle = {true:  {textDecoration: "line-through", color: "gray" },
                                   false: {textDecoration: "none",         color: "black"}};
        
        angular.forEach($scope.lists, function(value, key){
            $scope.lists[ key ].listCheckbox = $scope.lists[ key ].archive;
            $scope.lists[ key ].itemStyle = $scope.itemArchiveStyle[ $scope.lists[ key ].archive ];
        });
        
        return true;
    }
    
    $scope.setArchive = function(list) {
        list.archive = list.listCheckbox;
        list.showDelImg = false;
        
        updateLocalStorageLists();
        list.showDelImg = true;
        
        list.itemStyle = $scope.itemArchiveStyle[ list.archive ];
        
        return true;
    }
    
    $scope.initOption = function() {
        if(localStorageService.get('option_onlyView') === null) {
            localStorageService.add('option_onlyView', 0);
        }
        
        if(localStorageService.get('option_onlyView') == 1) {
            $scope.inputValue = true;
        } else {
            $scope.inputValue = false;
        }
        
        $scope.setOption($scope.inputValue);
        
        return true;
    }
    
    $scope.changeOption = function() {
        if($scope.inputValue === true) {
            localStorageService.add('option_onlyView', 1);
        } else {
            localStorageService.add('option_onlyView', 0);
        }
        
        $scope.setOption($scope.inputValue);
        
        return true;
    }
    
    $scope.setOption = function(inputValue) {
        if(inputValue === true) {
            var showCheckbox = false;
            var hideDelImg = true;
            var itemStyle = $scope.itemArchiveStyle[ false ];
        } else {
            var showCheckbox = true;
            var hideDelImg = false;
            var itemStyle = $scope.itemArchiveStyle[ true ];
        }
        
        angular.forEach($scope.lists, function(value, key){
            $scope.lists[ key ].showCheckbox = showCheckbox;
            $scope.lists[ key ].hideDelImg = hideDelImg;
            if($scope.lists[ key ].archive === true) {
                $scope.lists[ key ].itemStyle = itemStyle;
            }
        });
    }
    
    function updateLocalStorageLists() {
        localStorageService.add('lists', $scope.lists);
    }
    
    return {
        initController: $scope.initController,
        hover: $scope.hover,
        initArchive: $scope.initArchive,
        setArchive: $scope.setArchive,
        initOption: $scope.initOption,
        changeOption: $scope.changeOption
    };
}

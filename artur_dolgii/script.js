function MyCtrl($scope, localStorageService) {
    if(localStorageService.get('lists') === null) {
		$scope.lists = Array();
	} else {
		$scope.lists = localStorageService.get('lists');
	}
	
    $scope.putInList = function() {
        if(event.keyCode == 13) {
			var listId;
			
            if($scope.lists.length > 0) {
                listId = $scope.lists[ $scope.lists.length - 1 ][0].id + 1;
            } else {
				listId = 1;
			}
			
            var item = Array({id: listId, 
                              name: $scope.inputText, 
                              archive: false, 
                              show: true, 
                              showDelImg: false,
                              showCheckbox: true,
                              hideDelImg: false});
            $scope.lists.push( item );
            localStorageService.add('lists', $scope.lists);
            $scope.inputText = "";
        }
    }
    
    $scope.hover = function(list) {
        return list.showDelImg = ! list.showDelImg;
    };
    
    $scope.deleteItem = function(list) {
        var listArray = localStorageService.get('lists');
        for(var i = 0; i < listArray.length; i++) {
            if(listArray[i] !== null && listArray[i][0].id == list.id) listArray.splice(i, 1);
        }
        localStorageService.add('lists', listArray);
        
        return list.show = ! list.show;
    };
    
    $scope.initArchive = function() {
        angular.forEach($scope.lists, function(value, key){
            if($scope.lists[ key ][0].archive === true) {
				$scope.lists[ key ].listCheckbox = true;
				$scope.lists[ key ].item_style = { textDecoration: "line-through", color: "gray" };
			} else {
				$scope.lists[ key ].listCheckbox = false;
				$scope.lists[ key ].item_style = { textDecoration: "none", color: "black" };
			}
        });
    }
    
    $scope.setArchive = function(list) {
        angular.forEach($scope.lists, function(value, key){
			if($scope.lists[ key ][0].id === list[0].id) {
				$scope.lists[ key ][0].archive = list.listCheckbox;
				$scope.lists[ key ][0].showDelImg = false;
			}
        });
		
		localStorageService.add('lists', $scope.lists);
		list[0].showDelImg = true;
		
        if(list[0].archive === true) {
            list.item_style = { textDecoration: "line-through", color: "gray" };
		} else {
			list.item_style = { textDecoration: "none", color: "black" };
		}
        
		console.log(localStorageService.get('lists'));
		return false;
		
        var listArray = localStorageService.get('lists');
        console.log(listArray);
        for(var i = 0; i < listArray.length; i++) {
            if(listArray[i] !== null && listArray[i][0].id == list.id) {
                listArray[i][0].archive = true;
            }
        }
        localStorageService.add('lists', listArray);
        
        return list[0].archive = ! list[0].archive;
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
    }
    
    $scope.changeOption = function() {
		if($scope.inputValue === true) {
			localStorageService.add('option_onlyView', 1);
		} else {
			localStorageService.add('option_onlyView', 0);
		}
		
		$scope.setOption($scope.inputValue);
    }
    
    $scope.setOption = function(inputValue) {
        if(inputValue === true) {
            var showCheckbox = false;
            var hideDelImg = true;
            var item_style;
        } else {
            var showCheckbox = true;
            var hideDelImg = false;
            var item_style = { textDecoration: "line-through", color: "gray" };
        }
        
        angular.forEach($scope.lists, function(value, key){
            $scope.lists[ key ][0].showCheckbox = showCheckbox;
            $scope.lists[ key ][0].hideDelImg = hideDelImg;
            if($scope.lists[ key ][0].archive === true) {
				$scope.lists[ key ].item_style = item_style;
			}
        });
	}
}

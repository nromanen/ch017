angular.module('myApp', ['ngCookies']);

function MyCtrl($scope, $cookieStore, $rootScope) {
    var listArray = typeof $cookieStore.get('lists') == "object" 
        ? $cookieStore.get('lists') 
        : Array( $cookieStore.get('lists') );
    
    $scope.putInList = function() {
        if(event.keyCode == 13) {
            var domList = $rootScope.$$childTail.lists;
            if(domList === undefined) var i = 1;
            else if(domList[0] === null && domList.length == 1) var i = 1;
            else {
                var lastDomElem = domList[ domList.length - 1 ][0];
                var i = lastDomElem.id + 1;
            }
            var item = Array({id: i, 
                              name: $scope.inputText, 
                              archive: false, 
                              show: true, 
                              showDelImg: false,
                              showCheckbox: true,
                              hideDelImg: true});
            listArray.push( item );
            $cookieStore.put('lists', listArray);
            if(domList === undefined) $rootScope.$$childTail.lists = Array();
            $rootScope.$$childTail.lists.push( item );
            $scope.inputText = "";
        }
    }
}

function MyList($scope, $cookieStore) {
    $scope.lists = $cookieStore.get('lists');
    
    $scope.hover = function(list) {
        return list.showDelImg = ! list.showDelImg;
    };
    
    $scope.deleteItem = function(list) {
        var listArray = $cookieStore.get('lists');
        for(var i = 0; i < listArray.length; i++) {
            if(listArray[i] !== null && listArray[i][0].id == list.id) listArray.splice(i, 1);
        }
        $cookieStore.put('lists', listArray);
        
        return list.show = ! list.show;
    };
    
    $scope.setArchive = function(list) {
        list.item_style = list[0].archive 
            ? { textDecoration: "none", color: "black" }
            : { textDecoration: "line-through", color: "gray" };
        
        var listArray = $cookieStore.get('lists');
        console.log(listArray);
        for(var i = 0; i < listArray.length; i++) {
            if(listArray[i] !== null && listArray[i][0].id == list.id) {
                //listArray[i][0].archive = true;
            }
        }
        //$cookieStore.put('lists', listArray);
        
        return list[0].archive = ! list[0].archive;
    }
    
    $scope.setOption = function(list) {
        if($scope.inputValue === undefined) $scope.inputValue = $cookieStore.get('option_onlyView');
        
        $cookieStore.put('option_onlyView', $scope.inputValue);
        if(list !== undefined) {
            list.showCheckbox = $cookieStore.get('option_onlyView') ? false : true;
            list.hideDelImg = $cookieStore.get('option_onlyView');
        }
    }
}


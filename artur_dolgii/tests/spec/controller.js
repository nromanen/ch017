var $scope = {};
var index = 0;
var list = {};
var store = {};
var localStorageService = {
    add: function(key, value) {
        return store[ key ] = value || null;
    },
    get: function(key) {
        return store[ key ];
    }
};
var controllerFunc = controller($scope, localStorageService);

describe("Check controller functioning", function() {
    
    it("should initialize controller", function() {
        var flag;
        
        runs(function() {
            flag = false;
            localStorageService.add('lists', null);
            
            expect(controllerFunc.initController()).toBeTruthy();
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });
        
        waitsFor(function() {
            localStorageService.add('lists', {});
            return flag;
        }, "localStorage should not be empty", 750);
        
        runs(function() {
            expect(controllerFunc.initController()).toBeTruthy();
        });
    });
    
    it("should put in list", function() {
        var flag;
        $scope.lists = [{}];
        
        expect(controllerFunc.putInList()).toBeTruthy();
        
        runs(function() {
            flag = false;
            localStorageService.add('option_onlyView', 1);
            
            expect(controllerFunc.putInList()).toBeTruthy();
            
            setTimeout(function() {
                flag = true;
            }, 500);
        });
        
        waitsFor(function() {
            localStorageService.add('option_onlyView', '');
            return flag;
        }, "localStorage should be empty", 750);
        
        runs(function() {
            expect(controllerFunc.initController()).toBeTruthy();
        });
    });
    
    it("should check hover on item", function() {
        var list = {};
        
        list.showDelImg = false;
        expect(controllerFunc.hover(list)).toEqual(true);
        
        list.showDelImg = true;
        expect(controllerFunc.hover(list)).toEqual(false);
    });
    
    it("should delete item", function() {
        $scope.lists = [{}];
        expect(controllerFunc.deleteItem(index)).toEqual(true);
    });
    
    describe("Check archive functioning", function() {
        it("should initialize archive", function() {
            $scope.lists = [{}];
            
            expect(controllerFunc.initArchive()).toBeTruthy();
        });
        
        it("should set to archive", function() {
            expect(controllerFunc.setArchive(list)).toBeTruthy();
        });
    });
    
    describe("Check options functioning", function() {
        it("should initialize options", function() {
            var flag;
            
            runs(function() {
                flag = false;
                localStorageService.add('option_onlyView', null);
                
                expect(controllerFunc.initOption()).toBeTruthy();
                
                setTimeout(function() {
                    flag = true;
                }, 500);
            });
            
            waitsFor(function() {
                localStorageService.add('option_onlyView', 1);
                return flag;
            }, "localStorage should be empty", 750);
            
            runs(function() {
                expect(controllerFunc.initOption()).toBeTruthy();
            });
        });
        
        it("should change option", function() {
            expect(controllerFunc.changeOption()).toBeTruthy();
        });
        
        it("should change option", function() {
            $scope.lists = [{archive: true}];
            
            expect(controllerFunc.setOption()).toBeTruthy();
        });
    });
    
});

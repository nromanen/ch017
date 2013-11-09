var $scope = {};
var localStorageService = {
    add: function(key, value) {
        var store = {};
        store[ key ] = value;
        return true;
    },
    get: function(key) {
        var store = {};
        return store[ key ];
    }
};
var controllerFunc = controller($scope, localStorageService);

describe("Check controller functioning", function() {
    it("should initialize controller", function() {
        expect(controllerFunc.initController()).toBeTruthy();
    });
    
    it("should check hover on item", function() {
        var list = {};
        
        list.showDelImg = false;
        expect(controllerFunc.hover(list)).toEqual(true);
        
        list.showDelImg = true;
        expect(controllerFunc.hover(list)).toEqual(false);
    });
    
    describe("Check archive functioning", function() {
        it("should initialize archive", function() {
            expect(controllerFunc.initArchive()).toBeTruthy();
        });
        
        it("should set to archive", function() {
            var list = {};
            
            expect(controllerFunc.setArchive(list)).toBeTruthy();
        });
    });
    
    describe("Check options functioning", function() {
        it("should initialize options", function() {
            expect(controllerFunc.initOption()).toBeTruthy();
        });
        
        it("should change option", function() {
            expect(controllerFunc.changeOption()).toBeTruthy();
        });
    });
    
});

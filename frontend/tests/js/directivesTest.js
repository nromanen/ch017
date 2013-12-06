describe("Test all directives of our project", function () {

    var $compile, $rootScope;
    var $httpBackend;


    beforeEach(angular.mock.module('App'));
    beforeEach(angular.mock.module('ngMockE2E'));

    beforeEach(inject(
        ['$compile','$rootScope', function($c, $r) {
          $compile = $c;
          $rootScope = $r;
        }]
    ));

    beforeEach(inject(
        ['$httpBackend', function($h) {
            $httpBackend = $h;
            $httpBackend.whenGET('./templates/modalWindow.html').respond();
            $httpBackend.whenGET('./templates/patientList.html').respond();
            $httpBackend.whenGET('./templates/topPanel.html').respond();
            $httpBackend.whenJSONP('http://localhost:8000/api/todos/' +
                '?callback=JSON_CALLBACK&method=PUT&data={"id":1,"text":""}').respond();
        }]
    ));

    it("test contenteditable directive", function () {
        var element = $compile('<tag contenteditable todo-item="0"></tag>')($rootScope);
        $rootScope.currentPatient = {todo: [{id: 1, text: true}]};
        element.blur();
    });

    it("test datePicker directive", function () {
        var element = $compile('<tag date-picker></tag>')($rootScope);
        element.blur();
    });

    it("test hidePicker directive", function () {
        var element = $compile('<tag hide-picker></tag>')($rootScope);
    });

    it("test login validation directive", function () {
        var element = $compile('<input type="text" ng-model="authLogin" title="At least 3 characters ' +
            'class="form-control" placeholder="Login" required login autofocus>')($rootScope);

        expect(element.attr("pattern")).toBe("^[a-zA-Z][a-zA-Z0-9-_\.]{2,}$");
    });

    it("test modal window directive", function () {
        var element = $compile('<modal></modal>')($rootScope);

        expect(element.html()).toBe('');
    });

    it("test password validation directive", function () {
        var element = $compile('<input type="password" ng-model="authPassword" title="At least 4 characters" ' +
            'class="form-control" placeholder="Password" required  password>')($rootScope);

        expect(element.attr("pattern")).toBe("[^]{4,}$");
    });

    it("test patient list directive", function () {
        var element = $compile('<list class="left absolute"></list>')($rootScope);

        expect(element.html()).toBe('');
    });

    it("test removeIcon-hide directive", function () {
        var element = $compile('<tag mouseout></tag>')($rootScope);

        element.mouseout();
    });

    it("test removeIcon-show directive", function () {
        var element = $compile('<tag mouseover></tag>')($rootScope);
        var flag;

        runs(function() {
            flag = false;
            $rootScope.canRemoveTodo = function(){return true;};

            expect(element.mouseover()).toBeTruthy();

            setTimeout(function() {
                flag = true;
            }, 500);
        });

        waitsFor(function() {
            $rootScope.canRemoveTodo = function(){return false;};
            return flag;
        }, "Can not remove todo", 750);

        runs(function() {
            expect(element.mouseover()).toBeTruthy();
        });
    });

    it("test timePicker directive", function () {
        var element = $compile('<tag time-picker></tag>')($rootScope);
        element.blur();
    });

    it("test todo-blur directive", function () {
        var element = $compile('<tag blur></tag>')($rootScope);
        element.blur();
    });

    it("test todo-click directive", function () {
        var element = $compile('<tag click></tag>')($rootScope);
        element.click();
    });

    it("test todo-submit directive", function () {
        var element = $compile('<tag submit></tag>')($rootScope);
        element.submit();
    });

    it("test top-panel directive", function () {
        var element = $compile('<top_panel></top_panel>')($rootScope);
    });

    it("test updateLocalStorageOnChange directive", function () {
        var element = $compile('<ul update-local-storage-on-change></ul>')($rootScope);
        $rootScope.updateLocalStorage = function(){};
        element.scope().$apply();
    });

});
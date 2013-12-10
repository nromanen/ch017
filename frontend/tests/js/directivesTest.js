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
            $httpBackend.whenGET('./templates/patientList.html').respond();
            $httpBackend.whenJSONP('http://localhost:8000/api/todos/' +
                '?callback=JSON_CALLBACK&method=PUT&data={"id":1,"text":""}').respond();
        }]
    ));

    it("test clear directive", function () {
        var element = $compile('<tag clear></tag>')($rootScope);
        element.click();
    });

    it("test contenteditable directive", function () {
        var element = $compile('<tag contenteditable todo-item="0"></tag>')($rootScope);
        $rootScope.currentPatient = {todo: [{id: 1, text: true}]};
        element.blur();
    });

    it("test datePicker directive", function () {
        var element = $compile('<tag date-picker></tag>')($rootScope);
        element.blur();
    });

    it("test edit directive", function () {
        var element = $compile('<tag edit></tag>')($rootScope);
        $rootScope.currentPatient = {
            todo: [
                {
                    id: 1,
                    text: true,
                    time: [
                        {
                            id: 1,
                            time: ''
                        },
                        {
                            id: 2,
                            time: ''
                        }
                    ]
                }
            ]
        };

        element.click();
    });

    it("test hidePicker directive", function () {
        var element = $compile('<tag hide-picker></tag>')($rootScope);
        var elm = $compile('<tag class="datepicker-days"></tag>')($rootScope);

        angular.element(elm).click();
    });

    it("test login validation directive", function () {
        var element = $compile('<input login>')($rootScope);

        expect(element.attr("pattern")).toBe("^[a-zA-Z][a-zA-Z0-9-_\.]{2,}$");
    });

    it('test modal window directive', inject(function($compile, $rootScope, $templateCache) {
        $templateCache.put('./templates/modalWindow.html', '<tag></tag>');

        var element = $compile('<modal></modal>')($rootScope);
        var scope = element.scope();

        scope.$apply();
    }));

    it("test password validation directive", function () {
        var element = $compile('<input password>')($rootScope);

        expect(element.attr("pattern")).toBe("[^]{4,}$");
    });

    describe("test patient calendar directive", function () {
        it('Role should be === true', inject(function($compile, $rootScope, $templateCache) {
            $templateCache.put('./templates/patientCalendar.html', '<tag id="patient-datepicker"><div></div></tag>');

            var element = $compile('<calendar></calendar>')($rootScope);
            var scope = element.scope();

            $rootScope.currentUser = {"role": {}};
            $rootScope.currentUser.role.check = true;

            scope.$apply();
        }));

        it('Role should be === false AND dateMax should be ++than today', inject(function($compile, $rootScope, $templateCache) {
            $templateCache.put('./templates/patientCalendar.html', '<tag id="patient-datepicker"><div></div></tag>');

            var element = $compile('<calendar></calendar>')($rootScope);
            var scope = element.scope();

            $rootScope.currentUser = {"role": {}};
            $rootScope.currentUser.role.check = false;
            $rootScope.dateMax = '2013-12-31';

            scope.$apply();
        }));

        it('Role should be === false AND dateMax should be --than today', inject(function($compile, $rootScope, $templateCache) {
            $templateCache.put('./templates/patientCalendar.html', '<tag id="patient-datepicker"><div></div></tag>');

            var element = $compile('<calendar></calendar>')($rootScope);
            var scope = element.scope();

            $rootScope.currentUser = {"role": {}};
            $rootScope.currentUser.role.check = false;
            $rootScope.dateMax = '2013-11-31';
            dateScope = '2013-11-31';

            scope.$apply();
        }));
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

    it('test top-panel directive', inject(function($compile, $rootScope, $templateCache) {
        $templateCache.put('./templates/topPanel.html', '<tag></tag>');

        var element = $compile('<top_panel></top_panel>')($rootScope);
        var scope = element.scope();

        scope.$apply();
    }));

    it("test updateLocalStorageOnChange directive", function () {
        var element = $compile('<ul update-local-storage-on-change></ul>')($rootScope);
        $rootScope.updateLocalStorage = function(){};
        element.scope().$apply();
    });

});
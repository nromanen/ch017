describe("Should test all directives of our project", function () {

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

    beforeEach(inject(function($rootScope) {
        $rootScope.currentUser = {
            id: 1,
            login: 'doctor',
            password: '1111',
            is_active: false,
            is_doctor: false,
            is_staff: true,
            role: {
                add: true,
                edit: true,
                remove: true,
                check: true},
            todo: [
                {
                    edit: false,
                    text: '',
                    time: [
                        {
                            date: "",
                            time: ""
                        },
                        {
                            date: "",
                            time: ""
                        }
                    ]
                }
            ]
        };
        $rootScope.todoExample = $rootScope.currentUser.todo[0];
        $rootScope.currentPatient = $rootScope.currentUser;
    }));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', './templates/patientList.html').respond();
        $httpBackend.when('PUT', 'api/update_todo/1/1/').respond({});
    }));

    it("Should controll the button's state directive with Dates", function () {
        $rootScope.currentUser.is_doctor = true;
        $rootScope.patientList = [{time: [{date: "2013-12-11"}]}];
        $rootScope.currentDate = "2013-12-11";
        var element = $compile('<tag button-state></tag>')($rootScope);

        $rootScope.currentUser.is_doctor = false;
        var element = $compile('<tag button-state></tag>')($rootScope);

        element.click();
    });

    it("Should controll the button's state directive without Dates", function () {
        $rootScope.currentUser.is_doctor = true;
        $rootScope.patientList = [{}];
        $rootScope.currentDate = "2013-12-11";
        var element = $compile('<tag button-state></tag>')($rootScope);

        $rootScope.currentUser.is_doctor = false;
        var element = $compile('<tag button-state></tag>')($rootScope);

        element.click();
    });

    it("Should test clear directive", function () {
        var element = $compile('<tag clear></tag>')($rootScope);
        element.click();
    });

    it("Should test datePicker directive", function () {
        var element = $compile('<tag date-picker></tag>')($rootScope);
        $rootScope.$apply();
        element.blur();
    });

    it("Should test edit directive", function() {        
        var element = $compile('<tag edit></tag>')($rootScope);

        element.click();
    });

    it("Should test hidePicker directive", function () {
        var element = $compile('<tag hide-picker></tag>')($rootScope);
        var elm = $compile('<tag class="datepicker-days"></tag>')($rootScope);

        angular.element(elm).click();
    });

    it("Should test keywatcher directive", function () {
        var element = $compile('<tag keywatcher></tag>')($rootScope);

        var e = $.Event("keydown");
        e.keyCode = 13; /* Enter */
        element.trigger(e);

        var e = $.Event("keydown");
        e.keyCode = 38; /* Up-arrow */
        element.trigger(e);

        var e = $.Event("keydown");
        e.keyCode = 40; /* Down-arrow */
        element.trigger(e);
    });

    it("Should test login validation directive", function () {
        var element = $compile('<input login>')($rootScope);

        element.keydown();
    });

    it("Should test modal window directive", inject(function($compile, $rootScope, $templateCache) {
        $templateCache.put('./templates/modalWindow.html', '<tag></tag>');

        var element = $compile('<modal></modal>')($rootScope);
        var scope = element.scope();

        scope.$apply();
    }));

    it("Should test password validation directive", function () {
        var element = $compile('<input password>')($rootScope);

        expect(element.attr("pattern")).toBe("[^]{4,}$");
    });

    describe("Should test patient calendar directive", function () {
        it('Role should be === true', inject(function($compile, $rootScope, $templateCache) {
            $templateCache.put('./templates/patientCalendar.html', '<tag id="patient-datepicker"><div></div></tag>');

            var element = $compile('<calendar></calendar>')($rootScope);
            var scope = element.scope();

            $rootScope.currentUser = {"role": {}};
            $rootScope.currentUser.role.check = true;

            scope.$apply();
        }));

        it('Role should be === false AND dateLimit.max should be ++than today', inject(function($compile, $rootScope, $templateCache) {
            $templateCache.put('./templates/patientCalendar.html', '<tag id="patient-datepicker"><div></div></tag>');

            var element = $compile('<calendar></calendar>')($rootScope);
            var scope = element.scope();

            $rootScope.currentUser = {"role": {}};
            $rootScope.currentUser.role.check = false;
            $rootScope.dateLimit = {max: '2013-12-31'};

            scope.$apply();
        }));

        it('Role should be === false AND dateLimit.max should be --than today', inject(function($compile, $rootScope, $templateCache) {
            $templateCache.put('./templates/patientCalendar.html', '<tag id="patient-datepicker"><div></div></tag>');

            var element = $compile('<calendar></calendar>')($rootScope);
            var scope = element.scope();

            $rootScope.currentUser = {"role": {}};
            $rootScope.currentUser.role.check = false;
            $rootScope.dateLimit = {max: '2013-11-31'};
            dateScope = '2013-11-31';

            scope.$apply();
        }));
    });

    it("Should test patient list directive", function () {
        var element = $compile('<list class="left absolute"></list>')($rootScope);

        expect(element.html()).toBe('');
    });

    it("Should test removeIcon-hide directive", function () {
        var element = $compile('<tag mouseout></tag>')($rootScope);

        element.mouseout();
    });

    it("Should test removeIcon-show directive", function () {
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

    it("Should test timePicker directive", function () {
        var element = $compile('<tag time-picker></tag>')($rootScope);

        element.blur();
    });

    it('test top-panel directive', inject(function($compile, $rootScope, $templateCache) {
        $templateCache.put('./templates/topPanel.html', '<tag></tag>');

        var element = $compile('<top_panel></top_panel>')($rootScope);
        var scope = element.scope();

        scope.$apply();
    }));

    it("Should test updateUserScope directive", function () {
        var element = $compile('<ul update-user-scope></ul>')($rootScope);
        $rootScope.updateUserScope = function(){};
        element.scope().$apply();
    });

});
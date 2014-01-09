'use strict';

describe("Project tests", function() {
    xdescribe("Test doctor's role", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("Should clear localStorage", function() {
            localStorage.clear();
        });

        it('Should have the working "AuthController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should have non working "TodoController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        it('Should add an new item to the list', function() {
            var datetime = new Date();

            expect(repeater('#list li .content').count()).toBe(0);
            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('learn test');
            input('date').enter([datetime.getFullYear(), datetime.getMonth() + 1, datetime.getDate()].join('-'));
            input('time').enter([datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()].join(":"));

            element('#datetimepicker1 .form-control.add-on.datetime').click();
            element(".set-date-form .set-date").click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            element('.modal-footer button.btn.btn-default').click();

            expect(repeater('#list li .content').count()).toBeGreaterThan(0);
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should check if item was saved', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('Should login as nurse', function() {
            input('authLogin').enter('patient9');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/nurse/patient9");
        });

        it('Should show added item', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should "check" the item', function() {
            element('#list li .content .check_done').click();
            expect(repeater('#list li .content .done-true').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('Should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        it('Should remove added and "checked" item', function() {
            element('#list li .content .remove-icon').click();
            expect(repeater('#list li .content').count()).toBe(0);
        });

    });

    xdescribe("Test patient's capability to remove todo item", function() {

        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("Should clear localStorage", function() {
            localStorage.clear();
        });

        it('Should have the working "AuthController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should have non working "TodoController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        it('Should add an element to the list', function() {
            var datetime = new Date();

            expect(repeater('#list li .content').count()).toBe(0);
            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('learn test');
            input('date').enter([datetime.getFullYear(), datetime.getMonth() + 1, datetime.getDate()].join('-'));
            input('time').enter([datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()].join(":"));

            element('#datetimepicker1 .form-control.add-on.datetime').click();
            element(".set-date-form .set-date").click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            element('.modal-footer button.btn.btn-default').click();

            expect(repeater('#list li .content').count()).toBeGreaterThan(0);
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should check if item was saved', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it("Should login as patient", function() {
            input('authLogin').enter('patient5');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/patient/patient5");
        });

        it('Should check visibility of "remove icon"', function() {
            expect(element('#list li .content .remove-icon:visible').count()).toBe(0);
        });

        it("Should disallow opportunity to remove the item", function() {
            element('#list li .content .remove-icon').click();
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        clearTodo();
    });

    xdescribe("Test nurse's role", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("Should clear localStorage", function() {
            localStorage.clear();
        });

        it('Should have the working "AuthController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should have non working "TodoController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        xit('Should add an element to the list', function() {
            var datetime = new Date();

            expect(repeater('#list li .content').count()).toBe(0);
            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('learn test');
            input('date').enter([datetime.getFullYear(), datetime.getMonth() + 1, datetime.getDate()].join('-'));
            input('time').enter([datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()].join(":"));

            element('#datetimepicker1 .form-control.add-on.datetime').click();
            element(".set-date-form .set-date").click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            element('.modal-footer button.btn.btn-default').click();

            expect(repeater('#list li .content').count()).toBeGreaterThan(0);
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should check if item was saved', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('Should login as nurse', function() {
            input('authLogin').enter('patient9');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/nurse/patient9");
        });

        it('Should check existence of the item', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should disallow to remove item', function() {
            element('#list li .content .remove-icon').click();
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        clearTodo();

    });

    xdescribe("Test patient's role", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("Should clear localStorage", function() {
            localStorage.clear();
        });

        it('Should have the working "AuthController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should have non working "TodoController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        it('Should add an element to the list', function() {
            var datetime = new Date();

            expect(repeater('#list li .content').count()).toBe(0);
            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('learn test');
            input('date').enter([datetime.getFullYear(), datetime.getMonth() + 1, datetime.getDate()].join('-'));
            input('time').enter([datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()].join(":"));

            element('#datetimepicker1 .form-control.add-on.datetime').click();
            element(".set-date-form .set-date").click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            element('.modal-footer button.btn.btn-default').click();

            expect(repeater('#list li .content').count()).toBeGreaterThan(0);
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should check if item was saved', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('Should login as patient', function() {
            input('authLogin').enter('patient5');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/patient/patient5");
        });

        it('Should show last added items for', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should disallow "check" the item', function() {
            element('#list li .content .check_done').click();
            browser().reload();
            expect(repeater('#list li .content .done-false').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        clearTodo()

    });

    xdescribe("Test nurse's posibility to check items from past date", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("Should clear localStorage", function() {
            localStorage.clear();
        });

        it('Should have the working "AuthController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should have non working "TodoController" ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        it('Should add an element to the list', function() {
            var datetime = new Date();

            expect(repeater('#list li .content').count()).toBe(0);
            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('learn test');
            input('date').enter([datetime.getFullYear(), datetime.getMonth() + 1, datetime.getDate()].join('-'));
            input('time').enter([datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()].join(":"));

            element('#datetimepicker1 .form-control.add-on.datetime').click();
            element(".set-date-form .set-date").click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            element('.modal-footer button.btn.btn-default').click();
            expect(repeater('#list li .content').count()).toBeGreaterThan(0);
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should check if item was saved', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should logout from app', function() {
            element('.exit.ng-scope').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('Should login as nurse ', function() {
            input('authLogin').enter('patient10');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/nurse/patient10");
        });

        it('Should set date to tomorrow date', function(){
            var todayDate = new Date();
            input('todayDate').enter([todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate() + 1].join('-'));
        })

        it('Should "check" the item', function() {
            element('#list li .content .check_done').click();
        });

        it('Should be impossible to check the item', function() {
            browser().reload();
            expect(repeater('#list li .content .done-true').count()).toBe(1);
        });

        clearTodo()
    });


    describe("Test doctor's posibility to delete items from past date", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("Should clear localStorage", function() {
            localStorage.clear();
        });

        it('Should have the working "AuthController"', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should have non working "TodoController"', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('Should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        it('Should add an element to the list', function() {
            var datetime = new Date();

            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('learn test');
            input('date').enter([datetime.getFullYear(), datetime.getMonth() + 1, datetime.getDate()].join('-'));
            input('time').enter([datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()].join(":"));

            element('#datetimepicker1 .form-control.add-on.datetime').click();
            element(".set-date-form .set-date").click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            element('.modal-footer button.btn.btn-default').click();

            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should check if item was saved', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Should set date to yesterday date', function(){
            var todayDate = new Date();
            input('todayDate').enter([todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate() - 1].join('-'));
        })

        it('Should disallow removing the item', function() {
            element('#list li .content .remove-icon').click();
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });
    });
});

function clearTodo(){
    it("clear todo after test", function() {
        element('.exit.ng-scope').click();
        input('authLogin').enter('doctor');
        input('authPassword').enter('1111');
        element('button.btn.btn-lg.btn-primary.btn-block').click();
        element('#list li .content .remove-icon').click();
    });
}

/**
 * Created by tarix on 11/17/13.
 */
'use strict';

describe("Todo Project tests", function() {
    xdescribe("Test of doctor's role", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("clear localStorage", function() {
             localStorage.clear();
        });

        it('should has a working "AuthController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should has not a working "TodoController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('apple');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/Doctor/doctor");
        });

        it('add an new item to the list', function() {
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

        it('should save list after reload', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('should login as nurse', function() {
            input('authLogin').enter('patient9');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/Nurse/patient9");
        });

        it('should show last added item for Nurse', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('should mark "done" last added todo items', function() {
            element('#list li .content .check_done').click();
            expect(repeater('#list li .content .done-true').count()).toBe(1);
        });

        it('Nurse should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('Doctor should login again', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('apple');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/Doctor/doctor");
        });

        it("Doctor should remove last added and marked todo item", function() {
            element('#list li .content .remove-icon').click();
            expect(repeater('#list li .content').count()).toBe(0);
        });

    });

    xdescribe("Test patient's capability to delete todo item", function() {

        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("clear localStorage", function() {
             localStorage.clear();
        });

        it('should has a working "AuthController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should has not a working "TodoController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('apple');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/Doctor/doctor");
        });

        it('add an element to the list', function() {
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

        it('should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it("Should login as patient", function() {
            input('authLogin').enter('patient5');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/patient/patient5");
        });

        it("Should hide remove icon for patient", function() {
            expect(element('#list li .content .remove-icon:visible').count()).toBe(0);
        });

        it("Should prevent opportunity to delete todo item by patient", function() {
            element('#list li .content .remove-icon').click();
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });
    });

    xdescribe("Test of nurse's role", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("clear localStorage", function() {
             localStorage.clear();
        });

        it('should has a working "AuthController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should has not a working "TodoController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('apple');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/Doctor/doctor");
        });

        it('add an element to the list', function() {
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


        it('should save list after reload', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('should login as nurse', function() {
            input('authLogin').enter('patient9');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/Nurse/patient9");
        });

        it('should show last added todo items for Nurse', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('should not allow delete item', function() {
             element('#list li .content .remove-icon').click();
             browser().reload();
             expect(repeater('#list li .content').count()).toBe(1);
        });

        it('Nurse should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

    });

    describe("Test of patient's role", function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it("clear localStorage", function() {
             localStorage.clear();
        });

        it('should has a working "AuthController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should has not a working "TodoController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });

        it('should login as doctor', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('apple');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/Doctor/doctor");
        });

        it('add an element as list', function() {
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

        it('should save list after reload', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('should login as patient ', function() {
            input('authLogin').enter('patient5');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/patient/patient5");
        });

        it('should show last added todo items for Patient', function() {
            browser().reload();
            expect(repeater('#list li .content').count()).toBe(1);
        });

        it('should not allow to mark as "done" last added todo item', function() {
            element('#list li .content .check_done').click();
            browser().reload();
            expect(repeater('#list li .content .done-false').count()).toBe(1);
        });

        it('Patient should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

    });
});

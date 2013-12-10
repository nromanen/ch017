/**
 * Created by tarix on 11/17/13.
 */
'use strict';
describe('Todo_e2e', function() {
    describe('TodoController_e2e', function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
        });
        it('should have a working authentification page controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('AuthController');
        });
        it('should have not a working "TodoController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            expect(element('div[ng-view]').html()).toContain('TodoController');
        });
        it('should be doctor login', function() {
            input('authLogin').enter('doctor');
            input('authPassword').enter('1111');
            element('button.btn.btn-lg.btn-primary.btn-block').click();
            expect(browser().location().path()).toBe("/doctor/doctor");
        });
        it('should have a working "TodoController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/doctor/doctor");
            expect(element('div[ng-view]').html()).toContain('TodoController');
        });
        it('should have a working "PatientListController" controller ', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/doctor/doctor");
            expect(element('div[ng-view]').html()).toContain('PatientListController');
        });
        it('should be count list 0', function() {

            expect(repeater('#list li .content').count()).toBe(0);

        });
        it('validate input date', function() {
            input('todayDate').enter('2013-12-10');
            expect(input('todayDate').val()).toBe('2013-12-10');
          /*  input('todayDate').enter('2013-12-10q');
            element('button.btn-primary.btn:first').focus();
            expect(input('todayDate').val()).toBe('2013-12-10');*/
        });
        it('add to list 2 element', function() {

            expect(repeater('#list li .content').count()).toBe(0);
            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('learn test');
            input('date').enter('2013-12-10');
            input('time').enter('02:29:22');

            element('#datetimepicker1 .form-control.add-on.datetime').click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            element('.modal-footer button.btn.btn-default').click();

            expect(repeater('#list li .content').count()).toBeGreaterThan(0);
            expect(repeater('#list li .content').count()).toBe(1);

            element('button.btn-primary.btn.modalstartbutton').click();
            input('todoExample.text').enter('test project');
            input('date').enter('2013-12-10');
            input('time').enter('02:29:22');

            element('#datetimepicker2 .form-control.add-on.datetime').click();
            element('.well button.btn.btn-primary').click();
            expect(repeater('.modal-body ul li').count()).toBe(1);
            element('.modal-footer button.btn.btn-primary').click();
            //btn-default

            expect(repeater('#list li .content').count()).toBeGreaterThan(0);
            expect(repeater('#list li .content').count()).toBe(2);
        });

        it('should save list when reload', function() {

            browser().reload();
            expect(repeater('#list li .content').count()).toBe(2);
        });

        it('should filter the todo list', function() {
            expect(repeater('#list li .content').count()).toBe(2);
            input('searchQuery').enter('test');

            expect(repeater('#list li .content').count()).toBe(2);
            input('searchQuery').enter('learn');
            expect(repeater('#list li .content').count()).toBe(1);
            input('searchQuery').enter('te');
            expect(repeater('#list li .content').count()).toBe(2);
        });
        xit('should delete first item with checkbox', function() {
            element('.left.check_done:first').click();
            element('button.btn-primary.btn.btn-block').click();
            expect(repeater('#list li .content').count()).toBe(1);
        });
        xit('should add item after delete ', function() {
            input('todoText').enter('waaaazuuuuuuuuuuup');
            element('button.btn-info.btn:first').click();     //ne povunno vudaliatu kolu ne check
            element('.form-inline').click();
            element('button.btn-info.btn:first').click();    //ne povunno vudaliatu kolu ne check
            expect(repeater('#list li').count()).toBe(3);
        });


        it('should delete first item with delete button', function() {
            element('.glyphicon.glyphicon-remove.pointer.right.remove-icon:first').click();
            expect(repeater('#list li .content').count()).toBe(1);
        });


        xit('delete all item', function() {
            element('.content input').click();
            element('button.btn-info.btn:first').click();
            expect(repeater('#list li').count()).toBe(0);
        });
        xit('should save empty list when reload', function() {
            browser().reload();
            expect(repeater('#list li').count()).toBe(0);
        });

        xit('should jump to the /doctor/doctor home path when / is accessed', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/doctor/doctor");
        });

        it('should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

        xit("test contenteditable directive", function () {
            var element = $compile('' +
                '<div class="done-true todo_item" contenteditable="true" todo-item="1">' +
                'todo text' +
                '</div>')($rootScope);

            element.click();
            expect(element.is(":focus")).toBe(false);
        });

        xit("test removeIcon-hide directive", function () {

        });

        xit("test removeIcon-show directive", function () {

        });

        xit("test todo-blur directive", function () {

        });

        xit("test todo-click directive", function () {

        });

        xit("test todo-submit directive", function () {

        });

    });

    //
// test/e2e/directives/directivesSpec.js
///
/*    describe("E2E: Testing Directives", function() {

        beforeEach(function() {
            browser().navigateTo('index.html');
        });

        it('should have a working welcome directive apply it\'s logic to the page', function() {
            browser().navigateTo('#/patientList');
            expect(browser().location().path()).toBe("/patientList");
            expect(element('#list').html()).toContain('Now active patient');
        });

        it('should have a working youtube listing directive that goes to the right page when clicked', function() {
            browser().navigateTo('#/auth');
            element('.app-youtube-listing').click();
            expect(browser().location().path()).toMatch(/\/videos\/.+/);
        });

    });*/
});
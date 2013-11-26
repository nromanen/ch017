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

            expect(repeater('.todoList li').count()).toBe(0);

        });
        it('validate input', function() {

            expect(repeater('#list li').count()).toBe(0);
            input('todoText').enter('learn test');
            expect(input('todoText').val()).toBe('learn test');
        });
        it('add to list and remove', function() {

            expect(repeater('#list li').count()).toBe(0);
            input('todoText').enter('learn test');
            element('.form-inline').click();
            expect(repeater('#list li').count()).toBeGreaterThan(0);
            expect(repeater('#list li').count()).toBe(1);
            input('todoText').enter('write program');
            element('.form-inline').click();
            input('todoText').enter('write letter');
            element('.form-inline').click();
            expect(repeater('#list li').count()).toBe(3);
        });

        it('should save list when reload', function() {

            browser().reload();
            expect(repeater('#list li').count()).toBe(3);
        });

        it('should filter the todo list', function() {
            expect(repeater('#list li').count()).toBe(3);
            input('searchQuery').enter('test');

            expect(repeater('#list li').count()).toBe(1);
            input('searchQuery').enter('write');
            expect(repeater('#list li').count()).toBe(2);
         /* expect(repeater('#list li', 'Todo List(write)').column('todoList.text')).
                toEqual(["write program",
                    "write letter"]); */
            input('searchQuery').enter('te');
            expect(repeater('#list li').count()).toBe(3);
        });
        it('should delete first item with checkbox', function() {
            element('.left.check_done:first').click();
            element('button.btn-info.btn:first').click();
            expect(repeater('#list li').count()).toBe(2);
        });
        it('should add item after delete ', function() {
            input('todoText').enter('waaaazuuuuuuuuuuup');
            element('button.btn-info.btn:first').click();     //ne povunno vudaliatu kolu ne check
            element('.form-inline').click();
            element('button.btn-info.btn:first').click();    //ne povunno vudaliatu kolu ne check
            expect(repeater('#list li').count()).toBe(3);
        });
        it('should delete first item with delete button', function() {
            element('.glyphicon.glyphicon-trash.pointer.right.remove-icon:first').click();
            expect(repeater('#list li').count()).toBe(2);
        });
        it('delete all item', function() {
            element('.content input').click();
            element('button.btn-info.btn:first').click();
            expect(repeater('#list li').count()).toBe(0);
        });
        it('should save empty list when reload', function() {
            browser().reload();
            expect(repeater('#list li').count()).toBe(0);
        });

        it('should jump to the /doctor/doctor home path when / is accessed', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/doctor/doctor");
        });
        it('should logout from app', function() {
            element('.nav.navbar-nav.navbar-right a').click();
            expect(browser().location().path()).toBe("/auth");
        });

        it('should jump to the /auth home path when #/auth is accessed', function() {
            browser().navigateTo('#/auth');
            expect(browser().location().path()).toBe("/auth");
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/auth");
            browser().navigateTo('/');                          //chu potribno
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
/**
 * Created by tarix on 11/17/13.
 */
'use strict';
describe('Todo_e2e', function() {
    describe('TodoController_e2e', function() {
        beforeEach(function() {
            browser().navigateTo('index.html');
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
         //   expect(repeater('#list li', 'Todo List(write)').column('todoList.text')).
                toEqual(["write program",
                    "write letter"]);
            input('searchQuery').enter('te');
            expect(repeater('#list li').count()).toBe(3);
        });
        it('delete all item', function() {

            element('.content input').click();
            element('button').click();
            expect(repeater('#list li').count()).toBe(0);
        });
        it('should save empty list when reload', function() {

            browser().reload();
            expect(repeater('#list li').count()).toBe(0);
        });

        it('should jump to the / home path when / is accessed', function() {
            browser().navigateTo('#/');
            expect(browser().location().path()).toBe("/");
        });
        it('should jump to the /auth home path when #/auth is accessed', function() {
            browser().navigateTo('#/auth');
            expect(browser().location().path()).toBe("/auth");
        });
        it('should jump to the /userList home path when #/userList is accessed', function() {
            browser().navigateTo('#/userList');
            expect(browser().location().path()).toBe("/userList");
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
            browser().navigateTo('#/userList');
            expect(browser().location().path()).toBe("/userList");
            expect(element('#app-welcome-text').html()).toContain('Welcome');
        });

        it('should have a working youtube listing directive that goes to the right page when clicked', function() {
            browser().navigateTo('#/videos');
            element('.app-youtube-listing').click();
            expect(browser().location().path()).toMatch(/\/videos\/.+/);
        });

    });*/
});
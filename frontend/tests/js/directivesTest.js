xdescribe("Test all directives of our project", function () {

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

    xbeforeEach(inject(
        ['$httpBackend', function($h) {
            $httpBackend = $h;
            $httpBackend.whenGET('./templates/modalWindow.html').passThrough();
            $httpBackend.whenGET('./templates/patientList.html').passThrough();
        }]
    ));

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

    it("test top-panel directive", function () {
        var element = $compile('<top_panel></top_panel>')($rootScope);

        expect(element.html()).toBe('');
    });
});
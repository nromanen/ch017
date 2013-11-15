// Karma configuration
// Generated on Wed Nov 13 2013 10:30:14 GMT+0200 (EET)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: '/home/ruslan/work/softserve/todos_project/ch017/tests/js/*.js', included: false}
    ],
    files: [
      '/home/ruslan/work/softserve/todos_project/ch017/frameworks/angular/angular.min.js',
      '/home/ruslan/work/softserve/todos_project/ch017/frameworks/angular/angular-local-storage.js',
      '/home/ruslan/work/softserve/todos_project/ch017/frameworks/angular/angular-mocks.js',
      '/home/ruslan/work/softserve/todos_project/ch017/js/controllers/TodoController.js',
      '/home/ruslan/work/softserve/todos_project/ch017/js/controllers/AuthController.js',
      '/home/ruslan/work/softserve/todos_project/ch017/tests/js/AuthControllerTest.js',
      '/home/ruslan/work/softserve/todos_project/ch017/tests/js/TodoControllerTest.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    preprocessors: {
        '/home/ruslan/work/softserve/todos_project/ch017/js/controllers/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['coverage'],

    coverageReporter: {
        type : 'html',
        dir : 'coverage/',
        file: 'coverage.html'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Firefox'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};

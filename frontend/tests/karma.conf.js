module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],

    files: [

	'../frameworks/jquery/jquery-1.10.2.min.js',
	'../frameworks/angular/angular.min.js',
	'../frameworks/angular/angular-local-storage.js',
	'../frameworks/angular/angular-mocks.js',

	'../js/project-conf.js',

	'../js/controllers/*.js',
	'../js/factories/*.js',
	'../js/directive/*.js',

    'js/*/*.js',
    'js/*.js'

    ],

    exclude: [
        'js/EndtoEnd.js'
    ],

    preprocessors: {
        '../js/controllers/*.js': 'coverage',
        '../js/factories/*.js': 'coverage',
        '../js/directive/*.js': 'coverage'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type : 'html',
        dir : 'coverage/',
        file: 'coverage.html'
    },

    plugins: [
        'karma-jasmine',
        'karma-coverage',
        'karma-firefox-launcher'
    ],

    browsers: ['Firefox'],
    port: 7000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 60000,
    singleRun: false

  });
};

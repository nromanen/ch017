module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],

    files: [

	'../frameworks/jquery/jquery-1.10.2.min.js',
	'../frameworks/angular/angular.min.js',
	'../frameworks/angular/angular-local-storage.js',
	'../frameworks/angular/angular-mocks.js',
	'../frameworks/angular/angular-translate.min.js',
	'../frameworks/angular/angular-translate-loader-static-files.min.js',
    '../frameworks/bootstrap/js/bootstrap-datepicker.min.js',

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
        'karma-chrome-launcher'
    ],

    browsers: ['Chrome'],
    port: 7000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 60000,
    singleRun: false

  });
};

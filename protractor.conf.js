var jasmineReporters = require('jasmine-reporters');

exports.config = {
    framework: "jasmine",
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: [
        "./e2e/*.spec.js"
    ],

    allScriptsTimeout: 600000,
    getPageTimeout: 6000000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 600000,
        isVerbose : true,
        includeStackTrace : true
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './',
            filePrefix: 'xmlresults.xml'
        }));
    },

    onComplete: function() {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');

            var HTMLReport = require('protractor-html-reporter');

            testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: './',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false
            };
            new HTMLReport().from('xmlresults.xml', testConfig);
        });
    }
};
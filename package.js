/**
 * Basic package information
 */
Package.describe({
    name: "mbanting:cordova-accounts-resume",
    summary: "Ensures user sessions are resumed successfully on Meteor Cordova apps.",
    version: "1.0.0",
    git: "https://github.com/mbanting/meteor-cordova-accounts-resume"
});

/**
 * Cordova plugin dependencies
 */
Cordova.depends({
    'cordova-plugin-file': '3.0.0'
});

/**
 * Configuration for usage
 */
Package.onUse(function (api) {
    api.versionsFrom("1.0.1");
    api.use(["meteor", "accounts-base"]);
    api.use(["skinnygeek1010:cordova-status@0.2.0"], 'web.cordova');

    api.addFiles([
            "lib/client/deviceStorageService.js",
            "lib/client/index.js"
        ], ["web.cordova"]
    );

});

/**
 * Configuration for testing
 */
Package.onTest(function (api) {
    api.use(["tinytest", "accounts-password", "mbanting:cordova-accounts-resume"]);

    // including "mbanting:cordova-accounts-resume" above should have worked
    // but for some reason adding the files again is needed
    api.addFiles([
            "lib/client/deviceStorageService.js",
            "lib/client/index.js"
        ], ["web.cordova"]
    );

    // export for access in tests
    api.export('CordovaAccountsResume', 'web.cordova');
    api.export('DeviceStorageService', 'web.cordova');

    api.addFiles([
            "tests/server/setup.js"
        ], ["server"]
    );

    api.addFiles([
            "tests/client/stubs.js",
            "tests/client/cordovaAccountsResumeTests.js"
        ], ["web.cordova"]
    );

});
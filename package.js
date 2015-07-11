Package.describe({
  name: "mbanting:cordova-accounts-resume",
  summary: "Ensures user sessions are resumed successfully on Meteor Cordova apps.",
  version: "0.1.0",
  git: "https://github.com/mbanting/meteor-cordova-accounts-resume"
});


Cordova.depends({
  'org.apache.cordova.file': '1.3.3'
});


Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["meteor", "accounts-base"]);
  api.use(["skinnygeek1010:cordova-status@0.2.0"], 'web.cordova');

  api.addFiles([
      "lib/client/deviceStorageService.js",
      "lib/client/index.js"
      ], ["web.cordova"]
  );

});


Package.onTest(function (api) {
  api.use(["tinytest", "accounts-password", "mbanting:cordova-accounts-resume"]);

  //override onUse to make the following available outside Cordova and in client environment for testing
/*  api.use(["skinnygeek1010:cordova-status@0.2.0"], 'client');
*/

  // not sure why these need to be explicitly added for this to work
  api.addFiles([
        "lib/client/deviceStorageService.js",
        "lib/client/index.js"
      ], ["web.cordova"]
  );

  api.export('CordovaAccountsResume', 'web.cordova'); // export for testing purposes only
  api.export('DeviceStorageService', 'web.cordova'); // export for testing purposes only

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
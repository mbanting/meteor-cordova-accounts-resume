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
  api.use(["meteor", "jquery", "accounts-base"]);
  api.use(["skinnygeek1010:cordova-status@0.2.0"], 'web.cordova');



  api.addFiles([
      "lib/client/deviceStorageService.js",
      "lib/client/index.js"
      ], ["web.cordova"]);

  api.export("log");

});


Package.onTest(function (api) {
  api.use("tinytest");
  api.use("mbanting:cordova-accounts-resume");
  
  api.addFiles("tests/client/index.js", ["client"]);

});    
  
  
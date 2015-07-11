
Tinytest.add('Is CordovaAccountsResume available for testing?', function(test) {
    test.isNotUndefined(CordovaAccountsResume);
});

Tinytest.add('Is DeviceStorageService available for testing?', function(test) {
    test.isNotUndefined(DeviceStorageService);
});

Tinytest.addAsync('Is the token being stored on login?', function(test, next) {
    Meteor.logout(function(){
        Meteor.loginWithPassword("test", "test", function() {

            // give some time for the onLogin event handler to execute
            setTimeout(function(){
                DeviceStorageService.readFile(cordova.file.dataDirectory, "", FILENAME_RESUME_TOKEN, function (resumetoken) {
                    test.equal(Accounts._storedLoginToken(), resumetoken);
                    next();
                });
            }, 100);

        })
    })
});

// Filename
FILENAME_RESUME_TOKEN = "resumetoken.txt";

Meteor.startup(function () {
    if (Meteor.isCordova) {

        // handle logins on Cordova
        handleLoginOnCordova();

        // handle app resumes
        handleSessionResume();

    }
});

/**
 * This function supplements existing Meteor Accounts login functionality by storing the token in file storage
 */
var handleLoginOnCordova = function() {
    Accounts.onLogin(function() {
        var loginToken = Accounts._storedLoginToken ();
        if (loginToken != null) {
            DeviceStorageService.writeFile(cordova.file.dataDirectory, "", FILENAME_RESUME_TOKEN, loginToken);
        }
    });
};

/**
 * This function will attempt to resume an accounts session if the app is resumed using the token in file storage
 */
var handleSessionResume = function() {
    // setup a computation to watch for cordova status change
    Tracker.autorun(function () {
        if (Session.equals('cordovaStatus', 'resumed')) {
            // if no current user check if resume token is available to attempt a relogin
            if (Meteor.user() == null) {
                DeviceStorageService.readFile(cordova.file.dataDirectory, "", FILENAME_RESUME_TOKEN, function (resumetoken) {
                    if (resumetoken != null) {
                        // attempt a login with a resume token
                        Meteor.loginWithToken(resumetoken, function (error) {
                            console.log(error)
                        });
                    }
                });
            }
        }
    });
};
# mbanting:cordova-accounts-resume

Ensures user sessions are resumed successfully on Meteor Cordova apps. 

## Installation

```
    meteor add mbanting:cordova-accounts-resume
```

## Description

Unlike web applications that can be viewed from shared desktops and laptops, mobile users have come to expect that once they log in on an app, they stay authenticated even if the user switches to another app, or their phone or tablet shuts off. If the user resumes the app, they shouldn't have to log in again.

If you're using one of Meteor's excellent [Accounts](https://www.meteor.com/accounts) packages to handle user authentication, you may notice that when deployed and running on a mobile device via Cordova, the user's session eventually invalidates on a subsequent app resume, forcing the user to log in once again. This is because Meteor Accounts [stores the login token in localStorage](https://github.com/meteor/meteor/blob/master/packages/accounts-base/localstorage_token.js#L43). When an app goes to sleep, iOS and Android will periodically clear localStorage to free up memory.

This package resolves this issue by supplementing Meteor's account functionality, backing up the login token to the device's local file storage. When the app resumes, if localStorage was cleared (and thus no current user is authenticated), this package will check if the loginToken exists in file storage. If so, it will attempt to re-authenticate with this loginToken, resuming the user session if successful.

## Usage

This package is meant to be as unobtrusive as possible. Simply add the package and if using iOS configure the file storage.

### iOS File Storage Configuration 
This package uses the [org.apache.cordova.file](https://github.com/apache/cordova-plugin-file) plugin to store the login token on the device's filesystem. If supporting iOS, you may need to configure storage from the default `Compatibility` value to `Library`. If your application is new, or has never previously stored files in the persistent filesystem, then the `Library` setting is generally recommended. To do this add this to your Meteor app's [mobile configuration file](http://docs.meteor.com/#/full/mobileconfigjs):
```
// Configure cordova file plugin
App.configurePlugin('org.apache.cordova.file', {
    iosPersistentFileLocation: 'Library'
});
```
See the plugin's [documentation](https://github.com/apache/cordova-plugin-file#ios-persistent-storage-location) for more details.

## Feedback
I've successfully used this package in two Meteor Cordova applications. Hopefully this helps you in your next app. If you have any problems and have general feedback, please feel free to contact me!

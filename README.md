# mbanting:cordova-accounts-resume

Ensures users stay authenticated on a Meteor Cordova app, even if the user switches apps or the device shuts down. 

## Prerequisites

This version requires Meteor 1.2+ due to its use of NPM to pull in Cordova plugins. If using a prior Meteor version, use version 0.9.2 of this package.

## Installation

```
    meteor add mbanting:cordova-accounts-resume
```

## Description

Unlike web applications that can be viewed from shared desktops and laptops, mobile users expect to stay authenticated even if they switch to another app or their device shuts off. If the user resumes the app, they shouldn't have to log in again.

If you're using one of Meteor's excellent [Accounts](https://www.meteor.com/accounts) packages to handle user authentication, you may notice that when deployed and running on a mobile device via Cordova, the user's session eventually invalidates on a subsequent app resume, forcing the user to log in once again. This is because Meteor Accounts [stores the login token in localStorage](https://github.com/meteor/meteor/blob/master/packages/accounts-base/localstorage_token.js#L43). When an app goes to sleep, iOS and Android will periodically clear localStorage to free up memory.

This package resolves this issue by supplementing Meteor's account functionality, backing up the login token to the device's local file system. When the app resumes, if localStorage was cleared (and thus no current user is authenticated), this package will check if the loginToken exists in the file system. If so, it will attempt to re-authenticate with this loginToken, resuming the user session if successful.

## Usage

This package is meant to be as unobtrusive as possible. Simply add the package and if using iOS, optionally configure the file storage.

### iOS File Storage Configuration 
This package uses the [cordova-plugin-file](https://github.com/apache/cordova-plugin-file) plugin to store the login token on the device's filesystem. If supporting iOS, you may need to configure storage from the default `Compatibility` value to `Library`. If your application is new, or has never previously stored files in the persistent filesystem, then the `Library` setting is generally recommended. To do this add this to your Meteor app's [mobile configuration file](http://docs.meteor.com/#/full/mobileconfigjs):
```
// Configure cordova file plugin
App.configurePlugin('cordova-plugin-file', {
    iosPersistentFileLocation: 'Library'
});
```
See the plugin's [documentation](https://github.com/apache/cordova-plugin-file#ios-persistent-storage-location) for more details.

## Testing

To run this package's tests, it must be done on a mobile environment since this is a package solely aimed for Meteor
 Cordova apps. To do so, pass the flag to indicate which mobile environment to run in. For example:

```
meteor test-packages --ios-device ./
```

## Feedback
I've successfully used this package in two Meteor Cordova applications. Hopefully this helps you in your next app. If you have any problems, questions, or have general feedback, please feel free to contact me!

## License
The code for this package is licensed under the [MIT License](http://opensource.org/licenses/MIT).

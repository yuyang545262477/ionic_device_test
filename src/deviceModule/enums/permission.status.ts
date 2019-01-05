/*the same with cordova-plugin-diagnostic permission status*/
export enum PermissionStatus {
    GRANTED = "GRANTED", //  User granted access to this permission, the device is running Android 5.x or below, or the app is built with API 22 or below.
    DENIED = "DENIED", // User denied access to this permission
    NOT_REQUESTED = "NOT_REQUESTED", // App has not yet requested access to this permission.
    DENIED_ALWAYS = "DENIED_ALWAYS" // User denied access to this permission and checked "Never Ask Again" box.
}

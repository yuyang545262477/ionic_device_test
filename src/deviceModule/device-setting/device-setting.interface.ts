export interface DeviceSettingInterface {
    /**
     * Displays the device location settings to allow user to enable location services/change location mode.
     */
    switchToLocationSettings(): void;

    /**
     * Displays mobile settings to allow user to enable mobile data.
     */
    switchToMobileDataSettings(): void;

    /**
     * Displays Bluetooth settings to allow user to enable Bluetooth.
     */
    switchToBluetoothSettings(): void;

    /**
     * Displays WiFi settings to allow user to enable WiFi.
     */
    switchToWifiSettings(): void;

    /**
     * Switches to the wireless settings page in the Settings app. Allows configuration of wireless controls such as Wi-Fi, Bluetooth and Mobile networks.
     */
    switchToWirelessSettings(): void;

    /**
     * Displays NFC settings to allow user to enable NFC.
     */
    switchToNFCSettings(): void;

    /**
     * Opens settings page for this app.
     * On Android, this opens the "App Info" page in the Settings app.
     * On iOS, this opens the app settings page in the Settings app. This works only on iOS 8+ - iOS 7 and below will invoke the errorCallback.
     * @returns {Promise<any>}
     */
    switchToSettings(): Promise<any>;

}
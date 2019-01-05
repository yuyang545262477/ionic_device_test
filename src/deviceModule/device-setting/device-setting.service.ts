import {Injectable} from '@angular/core';
import {DeviceSettingInterface} from "./device-setting.interface";
import {Diagnostic} from "@ionic-native/diagnostic";

@Injectable()
export class DeviceSettingService implements DeviceSettingInterface {

    constructor(private diagnostic: Diagnostic) {
    }

    switchToBluetoothSettings(): void {
        return this.diagnostic.switchToBluetoothSettings();
    }

    switchToLocationSettings(): void {
        return this.diagnostic.switchToLocationSettings();
    }

    switchToMobileDataSettings(): void {
        return this.diagnostic.switchToMobileDataSettings();
    }

    switchToNFCSettings(): void {
        return this.diagnostic.switchToNFCSettings();
    }

    switchToSettings(): Promise<any> {
        return this.diagnostic.switchToSettings();
    }

    switchToWifiSettings(): void {
        return this.diagnostic.switchToWifiSettings();
    }

    switchToWirelessSettings(): void {
        return this.diagnostic.switchToWirelessSettings();
    }


}
import {Injectable} from "@angular/core";
import {NetworkInterface} from "./network.interface.";
import {Network} from "@ionic-native/network";
import {ConnectionType} from "./connection.type";
import {Observable} from "rxjs";
import {DeviceSettingService} from "../device-setting/device-setting.service";


@Injectable()
export class NetworkService implements NetworkInterface {

    constructor(private deviceSettingService: DeviceSettingService,
                private network: Network) {
    }

    getConnection(): ConnectionType {
        return this.network.Connection;
    }

    getType(): string {
        return this.network.type;
    }

    getDownLinkMax(): string {
        return this.network.downlinkMax;
    }

    watchChange(): Observable<any> {
        return this.network.onchange();
    }

    watchConnected(): Observable<any> {
        return this.network.onConnect();
    }

    watchDisconnected(): Observable<any> {
        return this.network.onDisconnect();
    }

    switchToWifiSetting(): void {
        return this.deviceSettingService.switchToWifiSettings();
    }

}

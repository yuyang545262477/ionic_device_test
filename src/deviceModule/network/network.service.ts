import {Injectable} from "@angular/core";
import {NetworkInterface} from "./network.interface.";
import {DeviceCommonService} from "../common/device-common.service";
import {Network} from "@ionic-native/network";
import {ConnectionType} from "./connection.type";
import {Observable} from "rxjs";


@Injectable()
export class NetworkService implements NetworkInterface {

  constructor(private deviceCommonService: DeviceCommonService,
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
    return this.deviceCommonService.switchToWifiSetting();
  }

}

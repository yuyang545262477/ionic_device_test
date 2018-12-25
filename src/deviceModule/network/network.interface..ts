import {Observable} from "rxjs";
import {ConnectionType} from "./connection.type";

export interface NetworkInterface {

  getType(): string;

  getDownLinkMax(): string;

  getConnection(): ConnectionType;

  watchChange(): Observable<any>;

  watchConnected(): Observable<any>;

  watchDisconnected(): Observable<any>;

  switchToWifiSetting(): void;
}

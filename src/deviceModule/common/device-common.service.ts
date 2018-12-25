import {Injectable} from "@angular/core";
import {DeviceCommonInterface} from "./device-common.interface";
import {Platform} from "ionic-angular";
import {ErrorHandleEnum} from "./error-handle.enum";
import {Diagnostic} from "@ionic-native/diagnostic";
import {PermissionStatusEnum} from "./permission-status.enum";
import {PermissionTypes} from "./permissiion.type";


@Injectable()
export class DeviceCommonService implements DeviceCommonInterface {
  private readonly _isCordova: boolean;
  private readonly _isAndroid: boolean;
  private readonly _isIos: boolean;

  private state_1: string = "[permission_1]->";
  private state_2: string = "[permission_2]->";
  private state_3: string = "[permission_3]->";

  constructor(private platform: Platform,
              private diagnostic: Diagnostic) {
    this._isCordova = this.platform.is("cordova");
    this._isAndroid = this.platform.is("android");
    this._isIos = this.platform.is("ios");
  }

  readyCamera(): Promise<ErrorHandleEnum | PermissionStatusEnum> {
    if (!this.isCordova()) return Promise.reject(ErrorHandleEnum.isNotCordova);
    return this.diagnostic.getCameraAuthorizationStatus(true)
      .then((permissionStatus_1: PermissionStatusEnum) => {
        console.log(this.state_1 + permissionStatus_1);
        return permissionStatus_1 == PermissionStatusEnum.GRANTED ?
          Promise.resolve(permissionStatus_1) :
          this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA);
      })
      .then((permissionStatus_2: PermissionStatusEnum) => {
        console.log(this.state_2 + permissionStatus_2);
        return permissionStatus_2 == PermissionStatusEnum.GRANTED ?
          Promise.resolve(permissionStatus_2) :
          Promise.reject(ErrorHandleEnum.permissionDefined);
      });
  }

  switchToSetting(): Promise<any> {
    return this.diagnostic.switchToSettings();
  }

  switchToWifiSetting(): void {
    return this.diagnostic.switchToWifiSettings();
  }

  private isCordova(): boolean {
    return this._isCordova;
  }

  readyGeolocationPermission(): Promise<void | ErrorHandleEnum> {
    return this.diagnostic.getLocationAuthorizationStatus()
      .then((permission_1: PermissionStatusEnum) => {
        console.log(this.state_1 + permission_1);
        return permission_1 === PermissionStatusEnum.GRANTED ?
          Promise.resolve() :
          this.diagnostic.requestRuntimePermissions([
            this.diagnostic.permission.ACCESS_FINE_LOCATION,
            this.diagnostic.permission.ACCESS_COARSE_LOCATION,
          ]);
      })
      .then((permission_2: PermissionTypes | void) => {
        console.log(this.state_2);
        if (!permission_2) return Promise.resolve();
        console.table(permission_2);
        return permission_2.ACCESS_FINE_LOCATION === PermissionStatusEnum.GRANTED && permission_2.ACCESS_COARSE_LOCATION === PermissionStatusEnum.GRANTED ?
          Promise.resolve() :
          Promise.reject(ErrorHandleEnum.permissionDefined);
      });
  }
}

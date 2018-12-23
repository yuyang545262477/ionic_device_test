import {Injectable} from '@angular/core';
import {DeviceCommonInterface} from "./device-common.interface";
import {Platform} from "ionic-angular";
import {ErrorHandleEnum} from "./error-handle.enum";
import {Diagnostic} from "@ionic-native/diagnostic";
import {PermissionStatusEnum} from "./permission-status.enum";


@Injectable()
export class DeviceCommonService implements DeviceCommonInterface {
  private readonly _isCordova: boolean;
  private readonly _isAndroid: boolean;
  private readonly _isIos: boolean;

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
        console.log("1 is " + permissionStatus_1);
        return permissionStatus_1 == PermissionStatusEnum.GRANTED ?
          Promise.resolve(permissionStatus_1) :
          this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA);
      })
      .then((permissionStatus_2: PermissionStatusEnum) => {
        console.log("2 is " + permissionStatus_2);
        return permissionStatus_2 == PermissionStatusEnum.GRANTED ?
          Promise.resolve(permissionStatus_2) :
          Promise.reject(ErrorHandleEnum.permissionDefined);
      });
  }


  private isCordova(): boolean {
    return this._isCordova;
  }


}

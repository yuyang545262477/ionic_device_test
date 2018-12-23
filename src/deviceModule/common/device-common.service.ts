import {Injectable} from '@angular/core';
import {DeviceCommonInterface} from "./device-common.interface";
import {Platform} from "ionic-angular";
import {DeviceErrorHandle} from "./device-error.handle";
import {Diagnostic} from "@ionic-native/diagnostic";


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

  readyCamera(): Promise<boolean | DeviceErrorHandle> {
    if (!this.isCordova()) return Promise.reject(DeviceErrorHandle.isNotCordova);
    return this.diagnostic.isCameraAuthorized()
      .then((state: boolean) => {
        return state ? Promise.resolve(true) : this.diagnostic.requestCameraAuthorization();
      })
      .then((state: boolean) => {
        console.log("state is " + state);
        return state ? Promise.resolve(true) : Promise.reject(DeviceErrorHandle.permissionDefined);
      });
  }




  private isCordova(): boolean {
    return this._isCordova;
  }


}

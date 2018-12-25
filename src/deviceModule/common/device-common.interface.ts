import {ErrorHandleEnum} from "./error-handle.enum";
import {PermissionStatusEnum} from "./permission-status.enum";

export interface DeviceCommonInterface {
  readyCamera(): Promise<ErrorHandleEnum | PermissionStatusEnum>;

  readyGeolocationPermission(): Promise<void | ErrorHandleEnum>;

  switchToWifiSetting(): void;

  switchToSetting(): Promise<string>

}

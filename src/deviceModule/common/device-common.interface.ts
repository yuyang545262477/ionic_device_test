import {ErrorHandleEnum} from "./error-handle.enum";
import {PermissionStatusEnum} from "./permission-status.enum";

export interface DeviceCommonInterface {
  readyCamera(): Promise<ErrorHandleEnum | PermissionStatusEnum>;


}

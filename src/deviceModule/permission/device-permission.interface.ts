import {ErrorHandleEnum} from "../enums/error-handle.enum";
import {PermissionStatus} from "../enums/permission.status";

export interface DevicePermissionInterface {
    readyCamera(): Promise<ErrorHandleEnum | PermissionStatus>;


    readyGeolocationPermission(): Promise<void | ErrorHandleEnum>;

    readyContactsPermission(): Promise<void | ErrorHandleEnum>;

}

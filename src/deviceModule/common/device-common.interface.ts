import {DeviceErrorHandle} from "./device-error.handle";

export interface DeviceCommonInterface {


  readyCamera(): Promise<boolean | DeviceErrorHandle>;


}

import {NgModule} from "@angular/core";
import {DeviceCommonService} from "./common/device-common.service";
import {Camera} from "@ionic-native/camera";
import {CameraService} from "./camera/Camera.service";
import {Diagnostic} from "@ionic-native/diagnostic";
import {Network} from "@ionic-native/network";
import {NetworkService} from "./network/network.service";
import {Geolocation} from "@ionic-native/geolocation";
import {GeolocationService} from "./geolocation/geolocation.service";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    Diagnostic, Camera, Network, Geolocation,
    DeviceCommonService, CameraService, NetworkService, GeolocationService,
  ],
})
export class DeviceModule {
}

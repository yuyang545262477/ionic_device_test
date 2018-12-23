import {NgModule} from '@angular/core';
import {DeviceCommonService} from "./common/device-common.service";
import {Camera} from "@ionic-native/camera";
import {CameraService} from "./camera/Camera.service";
import {Diagnostic} from "@ionic-native/diagnostic";


@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [Diagnostic, Camera, DeviceCommonService, CameraService],
})
export class DeviceModule {
}

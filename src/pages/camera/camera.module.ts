import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CameraPage} from './camera';
import {CameraService} from "../../deviceModule/camera/Camera.service";
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    CameraPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraPage),
  ],
  providers: []
})
export class CameraPageModule {
}

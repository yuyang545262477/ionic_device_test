import {Injectable} from '@angular/core';
import {CameraInterface} from "./camera.interface";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {DeviceCommonService} from "../common/device-common.service";
import {DeviceErrorHandle} from "../common/device-error.handle";

@Injectable()
export class CameraService implements CameraInterface {
  private readonly cameraOptions: CameraOptions;

  constructor(private common: DeviceCommonService,
              private camera: Camera) {
    this.cameraOptions = {
      quality: 69,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
  }

  getPictureFromLibrary(): Promise<string | DeviceErrorHandle> {
    const libraryOptions: CameraOptions = Object.assign(this.cameraOptions, {sourceType: this.camera.PictureSourceType.PHOTOLIBRARY});
    return this.common.readyCamera()
      .then(() => {
        return this.camera.getPicture(libraryOptions)
      })
      .then((dataUrl: string) => {
        return 'data:image/jpeg;base64,' + dataUrl;
      });
  }

  getPictureFromCamera(): Promise<string | DeviceErrorHandle> {
    const cameraOptions: CameraOptions = Object.assign(this.cameraOptions, {sourceType: this.camera.PictureSourceType.CAMERA});
    return this.common.readyCamera()
      .then(() => {
        return this.camera.getPicture(cameraOptions);
      })
      .then((dataUrl: string) => {
        return 'data:image/jpeg;base64,' + dataUrl;
      })
  }
}

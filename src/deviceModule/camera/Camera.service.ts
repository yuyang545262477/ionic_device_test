import {Inject, Injectable} from "@angular/core";
import {CameraInterface} from "./camera.interface";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {DevicePermissionService} from "../permission/device-permission.service";
import {ErrorHandleEnum} from "../enums/error-handle.enum";
import {DeviceSettingService} from "../device-setting/device-setting.service";
import {DeviceCommon} from "../common-service/common";
import {Diagnostic} from "@ionic-native/diagnostic";

@Injectable()
export class CameraService extends DeviceCommon implements CameraInterface {
    private readonly cameraOptions: CameraOptions;

    constructor(private common: DevicePermissionService,
                private deviceSettingService: DeviceSettingService,
                @Inject(Diagnostic) diagnostic,
                private camera: Camera) {
        super(diagnostic);
        this.permission = [this.diagnostic.permission.CAMERA, this.diagnostic.permission.READ_EXTERNAL_STORAGE];
        this.cameraOptions = {
            quality: 69,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };
    }


    ReadyPermission() {
        return super.ReadyPermission();
    }

    getPictureFromLibrary(): Promise<string | ErrorHandleEnum> {
        const libraryOptions: CameraOptions = Object.assign(this.cameraOptions, {sourceType: this.camera.PictureSourceType.PHOTOLIBRARY});
        return this.ReadyPermission()
            .then(() => {
                return this.camera.getPicture(libraryOptions);
            })
            .then((dataUrl: string) => {
                return "data:image/jpeg;base64," + dataUrl;
            });
    }

    getPictureFromCamera(): Promise<string | ErrorHandleEnum> {
        const cameraOptions: CameraOptions = Object.assign(this.cameraOptions, {sourceType: this.camera.PictureSourceType.CAMERA});
        return this.ReadyPermission()
            .then(() => {
                return this.camera.getPicture(cameraOptions);
            })
            .then((dataUrl: string) => {
                return "data:image/jpeg;base64," + dataUrl;
            });
    }

    switchToSetting(): Promise<any> {
        return this.deviceSettingService.switchToSettings();
    }
}

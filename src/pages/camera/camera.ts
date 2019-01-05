import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CameraService} from "../../deviceModule/camera/Camera.service";
import {ErrorHandleEnum} from "../../deviceModule/enums/error-handle.enum";
import {isNumber} from "ionic-angular/util/util";

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html',
})
export class CameraPage {
    safeUrl: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private cameraService: CameraService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CameraPage');
    }

    getPictureFromLibrary() {
        this.cameraService.getPictureFromLibrary()
            .then((img: string) => {
                this.safeUrl = img;
            })
            .catch((err: ErrorHandleEnum | number) => {
                console.log("complete error is" + err);
            });
    }

    getPictureFromCamera() {
        this.cameraService.getPictureFromCamera()
            .then((img: string) => {
                this.safeUrl = img;
            })
            .catch((err: ErrorHandleEnum | number) => {
                if (isNumber(err)) {
                    console.log(ErrorHandleEnum.permissionDefined);
                } else {
                    console.log(err);
                }
            });
    }

}

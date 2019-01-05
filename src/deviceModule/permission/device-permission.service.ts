import {Injectable} from "@angular/core";
import {DevicePermissionInterface} from "./device-permission.interface";
import {Platform} from "ionic-angular";
import {ErrorHandleEnum} from "../enums/error-handle.enum";
import {Diagnostic} from "@ionic-native/diagnostic";
import {PermissionStatus} from "../enums/permission.status";
import {PermissionTypes} from "../enums/permissiion.type";
import 'rxjs/add/operator/catch';

@Injectable()
export class DevicePermissionService implements DevicePermissionInterface {
    private readonly _isCordova: boolean;
    private readonly _isAndroid: boolean;
    private readonly _isIos: boolean;

    private state_1: string = "[permission_1]->";
    private state_2: string = "[permission_2]->";

    constructor(private platform: Platform,
                private diagnostic: Diagnostic) {
        this._isCordova = this.platform.is("cordova");
        this._isAndroid = this.platform.is("android");
        this._isIos = this.platform.is("ios");
    }

    readyCamera(): Promise<ErrorHandleEnum | PermissionStatus> {
        if (!this.isCordova()) return Promise.reject(ErrorHandleEnum.isNotCordova);
        return this.diagnostic.getCameraAuthorizationStatus(true)
            .then((permission: PermissionStatus) => {
                return permission === PermissionStatus.GRANTED ? Promise.resolve(permission) : Promise.reject(permission);
            })
            .catch(() => {
                return this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA)
                    .then((permission: PermissionStatus) => {
                        return permission === PermissionStatus.GRANTED ? Promise.resolve(permission) : Promise.reject(permission);
                    });
            });
    }

    readyGeolocationPermission(): Promise<void | ErrorHandleEnum> {

        return undefined;
    }


    // readyGeolocationPermission(): Promise<void | ErrorHandleEnum> {
    //     return this.diagnostic.getLocationAuthorizationStatus()
    //         .then((permission_1: PermissionStatus) => {
    //             console.log(this.state_1 + permission_1);
    //             return permission_1 === PermissionStatus.GRANTED ?
    //                 Promise.resolve() :
    //                 this.diagnostic.requestRuntimePermissions([
    //                     this.diagnostic.permission.ACCESS_FINE_LOCATION,
    //                     this.diagnostic.permission.ACCESS_COARSE_LOCATION,
    //                 ]);
    //         })
    //         .then((permission_2: PermissionTypes | void) => {
    //             console.log(this.state_2);
    //             if (!permission_2) return Promise.resolve();
    //             console.table(permission_2);
    //             return permission_2.ACCESS_FINE_LOCATION === PermissionStatus.GRANTED && permission_2.ACCESS_COARSE_LOCATION === PermissionStatus.GRANTED ?
    //                 Promise.resolve() :
    //                 Promise.reject(ErrorHandleEnum.permissionDefined);
    //         });
    // }

    readyContactsPermission(): Promise<void | ErrorHandleEnum> {
        return this.diagnostic.getContactsAuthorizationStatus()
            .then((permission_1: PermissionStatus) => {
                console.log(this.state_1 + permission_1);
                return permission_1 === PermissionStatus.GRANTED ?
                    Promise.resolve() :
                    this.diagnostic.requestRuntimePermissions([
                        this.diagnostic.permission.WRITE_CONTACTS,
                        this.diagnostic.permission.READ_CONTACTS,
                    ]);
            })
            .then((permission_2: void | PermissionTypes) => {
                if (!permission_2) return Promise.resolve();
                console.log(this.state_2);
                console.table(permission_2);
                return permission_2.READ_CONTACTS === PermissionStatus.GRANTED && permission_2.WRITE_CONTACTS === PermissionStatus.GRANTED ?
                    Promise.resolve() :
                    Promise.reject(ErrorHandleEnum.permissionDefined);
            });
    }


    private isCordova(): boolean {
        return this._isCordova;
    }
}

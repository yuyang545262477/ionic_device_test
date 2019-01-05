import {Injectable} from "@angular/core";
import {GeolocationInterface} from "./geolocation.interface";
import {Geolocation, GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import {Observable} from "rxjs";
import {DevicePermissionService} from "../permission/device-permission.service";
import {ErrorHandleEnum} from "../enums/error-handle.enum";
import {fromPromise} from "rxjs/observable/fromPromise";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class GeolocationService implements GeolocationInterface {

    private defaultOption: GeolocationOptions = {enableHighAccuracy: true};

    constructor(private geolocation: Geolocation,
                private deviceCommonService: DevicePermissionService) {
    }

    getCurrentPosition(options = this.defaultOption): Promise<Geoposition | ErrorHandleEnum> {
        return this.deviceCommonService.readyGeolocationPermission()
            .then(() => {
                return this.geolocation.getCurrentPosition(options);
            });
    }

    watchPosition(options = this.defaultOption): Observable<Geoposition | ErrorHandleEnum> {
        return fromPromise(this.deviceCommonService.readyGeolocationPermission())
            .mergeMap(() => this.geolocation.watchPosition(options));
    }


}

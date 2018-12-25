import {GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import {Observable} from "rxjs";
import {ErrorHandleEnum} from "../common/error-handle.enum";

export interface GeolocationInterface {

  getCurrentPosition(options?: GeolocationOptions): Promise<Geoposition | ErrorHandleEnum>;

  watchPosition(options?: GeolocationOptions): Observable<Geoposition | ErrorHandleEnum>;
}

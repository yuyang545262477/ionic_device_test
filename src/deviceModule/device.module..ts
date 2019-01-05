import {NgModule} from "@angular/core";
import {DevicePermissionService} from "./permission/device-permission.service";
import {Camera} from "@ionic-native/camera";
import {CameraService} from "./camera/Camera.service";
import {Diagnostic} from "@ionic-native/diagnostic";
import {Network} from "@ionic-native/network";
import {NetworkService} from "./network/network.service";
import {Geolocation} from "@ionic-native/geolocation";
import {GeolocationService} from "./geolocation/geolocation.service";
import {Contacts} from "@ionic-native/contacts";
import {ContactsService} from "./contacts/contacts.service.";
import {DeviceSettingService} from "./device-setting/device-setting.service";

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        Diagnostic, Camera, Network, Geolocation, Contacts,
        DeviceSettingService,
        DevicePermissionService, CameraService, NetworkService, GeolocationService, ContactsService,
    ],
})
export class DeviceModule {
}

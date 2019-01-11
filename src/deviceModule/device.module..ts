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
import {Media} from "@ionic-native/media";
import {File} from "@ionic-native/file";
import {AudioService} from "./audio-service/audio.service";
import {StorageService} from "./storage-service/storage.service";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    Diagnostic, Camera, Network, Geolocation, Contacts, Media, File,
    DeviceSettingService, StorageService,
    DevicePermissionService, CameraService, NetworkService, GeolocationService, ContactsService, AudioService,
  ],
})
export class DeviceModule {
}

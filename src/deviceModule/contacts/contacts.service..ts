import {Injectable} from "@angular/core";
import {Contact, Contacts} from "@ionic-native/contacts";
import {DevicePermissionService} from "../permission/device-permission.service";
import {ContactsInterface} from "./contacts.interface";
import {DeviceSettingService} from "../device-setting/device-setting.service";

@Injectable()
export class ContactsService implements ContactsInterface {

    constructor(private contacts: Contacts,
                private settingService: DeviceSettingService,
                private commonService: DevicePermissionService) {
    }


    gotContacts(): Promise<Contact[]> {
        return this.commonService.readyContactsPermission()
            .then(() => {
                return this.contacts.find(
                    ["displayName", "phoneNumbers", "photos"],
                    {multiple: true, hasPhoneNumber: true});
            });
    }

    goToSetting(): Promise<boolean> {
        return this.settingService.switchToSettings();
    }


}

import {Injectable} from "@angular/core";
import {Contact, Contacts} from "@ionic-native/contacts";
import {DeviceCommonService} from "../common/device-common.service";
import {ContactsInterface} from "./contacts.interface";

@Injectable()
export class ContactsService implements ContactsInterface {

  constructor(private contacts: Contacts,
              private commonService: DeviceCommonService) {
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
    return this.commonService.switchToSetting();
  }


}

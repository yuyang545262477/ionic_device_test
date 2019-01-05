import {Contact} from "@ionic-native/contacts";

export interface ContactsInterface {
    // readyPermission(): Promise<boolean>;

    gotContacts(): Promise<Contact[]>;

    goToSetting(): Promise<boolean>;
}

import {Injectable} from "@angular/core";
import {StorageInterface} from "./storage.interface";
import {Storage} from "@ionic/storage";

@Injectable()
export class StorageService implements StorageInterface {

  constructor(private storage: Storage) {
    console.log("storage service instance right now");
  }

  getToken(): string {
    return "";
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }

  get<T>(key: string): Promise<T> {
    return this.storage.get(key);
  }

  set<T>(key: string, value: T): Promise<T> {
    return this.storage.set(key, value);
  }


}

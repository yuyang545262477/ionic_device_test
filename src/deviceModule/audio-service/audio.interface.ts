import {MediaObject} from "@ionic-native/media";
import {Observable} from "rxjs";

export interface AudioInterface {
  createFileName(): Observable<string>;

  recordAudio(fileName: string): Observable<MediaObject>;

  stopAudio(mediaInstance: MediaObject): Observable<MediaObject>

  playAudio(fileName: string): Observable<MediaObject>
}

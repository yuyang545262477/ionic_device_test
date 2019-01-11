import {Inject, Injectable} from "@angular/core";
import {AudioInterface} from "./audio.interface";
import {DeviceCommon} from "../common-service/common";
import {Media, MediaObject} from "@ionic-native/media";
import {File} from "@ionic-native/file";
import {Observable} from "rxjs";
import {Platform} from "ionic-angular";
import {Diagnostic} from "@ionic-native/diagnostic";
import {of} from "rxjs/observable/of";


@Injectable()
export class AudioService extends DeviceCommon implements AudioInterface {
  fileType: string;
  fileKey: string;

  constructor(public platform: Platform,
              private media: Media,
              private file: File,
              @Inject(Diagnostic) diagnostic) {
    super(diagnostic);
    this.permission = [this.diagnostic.permission.RECORD_AUDIO];
    this.fileType = this.renderFileType();
    this.fileKey = "audioRecord";
  }

  createFileName(): Observable<string> {
    const timestamp: string = new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds().toString();
    const backFileName = this.fileKey + timestamp + this.fileType;
    return of(backFileName);
  }


  recordAudio(fileName: string): Observable<MediaObject> {
    const filePath = this.renderFilePath(fileName);
    const mediaInstance: MediaObject = this.media.create(filePath);
    mediaInstance.startRecord();
    return of(mediaInstance);
  }

  stopAudio(mediaInstance: MediaObject): Observable<MediaObject> {
    mediaInstance.stopRecord();
    return of(mediaInstance);
  }

  playAudio(fileName: string): Observable<MediaObject> {
    const filePath = this.renderFilePath(fileName);
    const mediaInstance: MediaObject = this.media.create(filePath);
    return of(mediaInstance);
  }


  /*渲染文件类型*/
  private renderFileType() {
    let backType: string = "";
    if (this.platform.is("android")) {
      backType = ".3gp";
    } else if (this.platform.is("ios")) {
      backType = ".m4a";
    } else {
      backType = ".mp3";
    }
    return backType;
  }

  /* 根据文件名 渲染文件路径*/
  private renderFilePath(fileName: string): string {
    let backPath = "";
    if (this.platform.is("ios")) {
      backPath = this.file.documentsDirectory.replace(/file:\/\//g, "") + fileName;
    } else if (this.platform.is("android")) {
      backPath = this.file.externalDataDirectory.replace(/file:\/\//g, "") + fileName;
    }
    return backPath;
  }


}

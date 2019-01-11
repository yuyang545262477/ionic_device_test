import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {AudioPageInterface} from "./audio-page.Interface";
import {AudioService} from "../../deviceModule/audio-service/audio.service";
import {PageInterface} from "../page.interface";
import {MediaObject} from "@ionic-native/media";
import {fromPromise} from "rxjs/observable/fromPromise";
import {StorageService} from "../../deviceModule/storage-service/storage.service";
import {StorageKey} from "../../deviceModule/storage-service/storage-key.enum";
import {_throw} from "rxjs/observable/throw";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/takeWhile";

/**
 * Generated class for the AudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-audio",
  templateUrl: "audio.html",
})
export class AudioPage implements AudioPageInterface, PageInterface {
  files: string[] = [];
  private fileName: string;
  private mediaInstance: MediaObject;
  private isAlive: boolean = true;
  private isRecording: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private audioService: AudioService,
              private storageService: StorageService) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AudioPage");
  }

  ionViewDidLeave() {
    this.isAlive = false;
  }

  recordStart() {
    if (this.isRecording) return;
    console.info("录音开始");
    this.isRecording = true;
    this.audioService.createFileName()
      .mergeMap((fileName: string) => {
        this.fileName = fileName;
        return this.audioService.recordAudio(fileName);
      })

      .mergeMap((mediaInstance: MediaObject) => {
        this.mediaInstance = mediaInstance;
        return of(mediaInstance);
      })
      .takeWhile(() => this.isAlive)
      .subscribe(() => {
        console.info("录音开始");
      }, (_) => {
        console.warn("录音错误" + _);
      });
  }

  recording() {
    console.info("正在录音");
  }

  recordingEnd() {
    if (!this.isRecording) return;
    console.info("录音结束");
    this.isRecording = false;
    this.audioService.stopAudio(this.mediaInstance)
      .mergeMap(() => {
        this.files = this.files.concat(this.fileName);
        return fromPromise(this.storageService.set(StorageKey.audio, this.files));
      })
      .takeWhile(() => this.isAlive)
      .subscribe(() => {
        console.log("缓存成功");
        this.mediaInstance = null;
        this.fileName = null;
      });
  }

  playAudio(fileName: string) {
    fromPromise(this.storageService.get(StorageKey.audio))
      .mergeMap((files: string[]) => {
        return files.indexOf(fileName) === -1 ?
          _throw("fileName is not exit") :
          of(fileName);
      })
      .mergeMap((fileName: string) => this.audioService.playAudio(fileName))
      .map((messageInstance: MediaObject) => messageInstance.setVolume(.8))
      .takeWhile(() => this.isAlive)
      .subscribe(() => {
        console.log("播放完毕");
      }, error1 => {
        console.log("文件不存在", error1);
      });

  }

  getFileName() {
  }

  storageFileName() {
  }


}

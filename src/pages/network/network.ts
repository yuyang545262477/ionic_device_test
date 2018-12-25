import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {GeolocationService} from "../../deviceModule/geolocation/geolocation.service";
import {Geoposition} from "@ionic-native/geolocation";
import {ErrorHandleEnum} from "../../deviceModule/common/error-handle.enum";
import {Subscription} from "rxjs";

/**
 * Generated class for the NetworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-network",
  templateUrl: "network.html",
})
export class NetworkPage {
  _position: Geoposition;
  _errorString: ErrorHandleEnum | string;
  private _watchRx$: Subscription;
  getStates: "waiting" | "getting" | "got" | "error" = "waiting";
  watchStates: "waiting" | "startWatch" | "watching" | "error" | "stop" = "waiting";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocationService: GeolocationService) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NetworkPage");
  }

  getCurrentPosition() {
    this.getStates = "getting";
    this.geolocationService.getCurrentPosition()
      .then((currPotions: Geoposition) => {
        this.getStates = "got";
        this._position = currPotions;
      })
      .catch((error: ErrorHandleEnum) => {
        this.getStates = "error";
        this._errorString = error;
        this._position = null;
      });
  }

  watchPosition() {
    this.watchStates = "startWatch";
    this._watchRx$ = this.geolocationService.watchPosition()
      .subscribe((watchPosition: Geoposition) => {
        this.watchStates = "watching";
        this._position = watchPosition;
      }, (error1 => {
        this.watchStates = "error";
        this._errorString = error1;
        this._position = null;
      }));
  }

  stopWatchPosition() {
    if (!this._watchRx$) return;
    this._watchRx$.unsubscribe();
    this.watchStates = "stop";
  }

  ionViewWillLeave() {
    this.stopWatchPosition();
  }
}

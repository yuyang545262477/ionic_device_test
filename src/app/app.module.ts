import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {DeviceModule} from "../deviceModule/device.module.";

const commonPage = [MyApp];

@NgModule({
  declarations: [
    ...commonPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DeviceModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...commonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}

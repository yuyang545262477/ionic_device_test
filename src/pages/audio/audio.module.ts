import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {AudioPage} from "./audio";
import {LongPressDirective, LongPressModule} from "ionic-long-press";

@NgModule({
  declarations: [
    AudioPage,
  ],
  imports: [
    LongPressModule,
    IonicPageModule.forChild(AudioPage),
  ],
})
export class AudioPageModule {
}

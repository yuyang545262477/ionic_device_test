import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecureFilePage } from './secure-file';

@NgModule({
  declarations: [
    SecureFilePage,
  ],
  imports: [
    IonicPageModule.forChild(SecureFilePage),
  ],
})
export class SecureFilePageModule {}

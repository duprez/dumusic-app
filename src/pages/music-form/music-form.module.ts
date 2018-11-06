import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicFormPage } from './music-form';

@NgModule({
  declarations: [
    MusicFormPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicFormPage),
  ],
  entryComponents: [
    MusicFormPage
  ]
})
export class MusicFormPageModule {}

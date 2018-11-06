import { PipesModule } from './../../pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyApiProvider } from './../../providers/spotify-api/spotify-api';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music';
import { MusicListComponent } from '../../components/music-list/music-list';
import { MusicProvider } from '../../providers/music/music';

@NgModule({
  declarations: [
    MusicPage,
    MusicListComponent
  ],
  entryComponents: [
    MusicPage
  ],
  imports: [
    IonicPageModule.forChild(MusicPage),
    HttpClientModule,
    PipesModule
  ],
  providers: [
    SpotifyApiProvider,
    MusicProvider
  ]
})
export class MusicPageModule {}

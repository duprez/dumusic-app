import { MusicFormPageModule } from './../pages/music-form/music-form.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// PAGES
import { TabsPage } from '../pages/tabs/tabs';

// MODULES
import { MusicPageModule } from '../pages/music/music.module';
import { ProfilePageModule } from '../pages/profile/profile.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpotifyApiProvider } from '../providers/spotify-api/spotify-api';
import { HttpClientModule } from '@angular/common/http';
import { MusicProvider } from '../providers/music/music';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from "angularfire2/storage";
import { HttpModule } from '@angular/http';
import { AudioProvider } from '../providers/audio/audio';

const firebaseConfig = {
  apiKey: "AIzaSyDLZuOqHji6PEPFIRR8wY1qXhOGwSwJ08I",
  authDomain: "dumusic-fy.firebaseapp.com",
  databaseURL: "https://dumusic-fy.firebaseio.com",
  projectId: "dumusic-fy",
  storageBucket: "dumusic-fy.appspot.com",
  messagingSenderId: "988340070257"
};

// NATIVE
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MusicPageModule,
    MusicFormPageModule,
    ProfilePageModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpotifyApiProvider,
    MusicProvider,
    AudioProvider,
    FileChooser,
    FilePath,
    File
  ]
})
export class AppModule {}

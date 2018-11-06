import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { MusicPage } from '../music/music';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MusicPage;
  tab2Root = ProfilePage;

  constructor() {

  }
}

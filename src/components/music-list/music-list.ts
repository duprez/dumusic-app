import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'music-list',
  templateUrl: 'music-list.html'
})
export class MusicListComponent {

  @Input() list: any;
  @Output() selectSong = new EventEmitter<any>();
  @Output() deleteSong = new EventEmitter<any>();
  @Output() editSong = new EventEmitter<any>();
  @Output() openSong = new EventEmitter<any>();
  
  constructor() {}

  onSelectSong(song: any) {
    this.selectSong.emit({song: song});
  }

  onDeleteSong(song: any) {
    this.deleteSong.emit({song: song});
  }

  onOpenSong(song: any) {
    this.openSong.emit({song: song});
  }

  onEditSong(song: any) {
    this.editSong.emit({song: song});
  }
}

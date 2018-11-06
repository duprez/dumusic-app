import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { AngularFireDatabase } from 'angularfire2/database';
import { AudioProvider } from "./../../providers/audio/audio";
import { MusicProvider } from "./../../providers/music/music";
import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController,
  AlertController
} from "ionic-angular";
import { TextFilterPipe } from '../../pipes/text-filter/text-filter';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-music",
  templateUrl: "music.html"
})
export class MusicPage {
  @ViewChild("audio")
  audio;

  list: any;
  filteredList: any;
  song: any;
  onPlaying: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private musicProvider: MusicProvider,
    public modalCtrl: ModalController,
    public audioProvider: AudioProvider,
    public toastCtrl: ToastController,
    public db: AngularFireDatabase,
    public alertCtrl: AlertController,
    private filter: TextFilterPipe,
    private fileChooser: FileChooser,
    private file: File,
    private filePath: FilePath,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.getList();
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      position: 'top',
      dismissOnPageChange: true
    });
    toast.present();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      duration: 3000
    });
    loader.present();
  }

  getList() {
    this.musicProvider.getList().subscribe(res => {
      this.list = res;
      this.filteredList = res;
    });
  }

  filterList(event) {
    console.log(event.target.value);
    this.filteredList = this.filter.transform(
      this.list,
      event.target.value.toLowerCase()
    );
  }

  /**
   * Open the file chooser and submit the file choosed
   */
  chooseFile() {
    this.fileChooser.open().then(fileUrl => {
      this.filePath.resolveNativePath(fileUrl).then(url => {
        const pathSegments = url.split('/');
        const name = this.getFileName(pathSegments);
        this.file.readAsArrayBuffer(this.getPath(pathSegments), name).then(arrayBuffer => {
          this.addMusic(new Blob([arrayBuffer], {type: 'audio/mp3'}), name); 
        }).catch(err => confirm(err));
      }).catch(err => confirm(err));
    }).catch(err => confirm(err));
  }

  /**
   * Get the file name
   * @param pathSegments
   */
  private getFileName(pathSegments) {
    return pathSegments[pathSegments.length - 1];
  }

  /**
   * Remote the file name of the current path
   * @param pathSegments
   */
  private getPath(pathSegments) {
    pathSegments.pop();
    return pathSegments.join('/');
  }

  addMusic(blob, name) {
    this.musicProvider.addMusic(blob, name);
    // this.musicProvider.addMusic(event.target.files);
    // this.presentToast('Subiendo archivos, esto puede tomar unos segundos...');
  }

  deleteSong(song: any) {
    const confirm = this.alertCtrl.create({
      title: 'Borrar canción',
      message: `¿Seguro que quieres borrar ${song.name} de tu lista? Esta acción es irreversible`,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'btn-dark'
        },
        {
          text: 'Borrar',
          cssClass: 'btn-danger',
          handler: () => {
            this.musicProvider.deteleMusic(song.key).then(() => this.presentToast('La canción se ha borrado'));
          }
        }
      ],
      
    });
    confirm.present();
  }

  openSong(song: any) {
    console.log('Abriendo el detalle de la cancion...', song);
  }

/*   openMusicForm(song: any) {
    const modal = this.modalCtrl.create(MusicFormPage, {song: song});
    modal.onDidDismiss(data => {
      if (data) {
        this.addMusic(data.music, data.file)
      }
    });
    modal.present();
  } */

  selectSong(song: any) {
    this.pause();
    this.song = song;
    this.playStream(song.url);
  }

  getSongUrl() {
    console.log(this.audio);
  }

  pause() {
    this.audioProvider.pause();
    this.onPlaying = false;
  }

  play() {
    this.audioProvider.play();
    this.onPlaying = true;
  }

  stop() {
    this.audioProvider.stop();
  }

  next() {
   let index = this.list.findIndex(song => song.url === this.song.url);
   this.selectSong(this.list[index + 1]);
  }

  previous() {
    let index = this.list.findIndex(song => song.url === this.song.url);
    this.selectSong(this.list[index - 1]);
  }

  playStream(url) {
    this.stop();
    this.audioProvider.playStream(url).subscribe();
    this.onPlaying = true;
  }

}

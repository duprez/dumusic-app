import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import { map } from "rxjs/operators";

const DUMUSIC_API = "https://dumusic-fy.firebaseio.com/";

@Injectable()
export class MusicProvider {
  private basePath: string = "/uploads";
  uploads: any;

  constructor(
    public http: HttpClient,
    public db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getList() {
   /*  return this.http
      .get(`${DUMUSIC_API}list/.json`)
      .pipe(map(res => Object.keys(res).map(key => res[key]))); */
      return this.db.list('/list').snapshotChanges().map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      });
  }

 /*  addMusic(files: any[]) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.storage.upload(`music/${file.name}`, file, {contentType: 'audio/mp3'}).then(res => {
        this.db.list("list/").push({
          name: file.name.substr(0, file.name.length - 4),
          date: new Date(file.lastModified),
          url: res.downloadURL
        });
      });
    }
  } */

  async addMusic(file: Blob, name: string) {
    this.storage.ref('musica/' + name).put(file).then(res => {
      this.db.list('list/').push({
        name: name.substr(0, name.length - 4),
        date: new Date(),
        url: res.downloadURL
      })
    }).catch(err => confirm(err));
   /*  this.storage.upload(`music/${file.name}`, file, {contentType: 'audio/mp3'}).then(res => {
      this.db.list("list/").push({
        name: file.name.substr(0, file.name.length - 4),
        date: new Date(file.lastModified),
        url: res.downloadURL
      });
    }); */
  }

  deteleMusic(key: string) {
    return this.db.list('/list').remove(key);
  }
}

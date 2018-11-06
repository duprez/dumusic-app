import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-music-form',
  templateUrl: 'music-form.html',
})
export class MusicFormPage {
  
  files: Set<File> = new Set();
  musicForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public viewCtrl: ViewController
  ) {
    this.createMusicForm();
  }

  createMusicForm() {
    this.musicForm = this.fb.group({
      name: [null, Validators.required],
      file: [null, Validators.required]
    });
  }

  onSubmit() {
    this.viewCtrl.dismiss({music: this.musicForm.value, file: this.files[0]});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  onChanges($event) {
    this.files = $event.target.files;
    console.log(this.files[0]);
  }

}

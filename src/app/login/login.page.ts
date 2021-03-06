import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    txtKp: '840806065308',
    txtPass: 'Qwerty@123456'
  };

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public storageService: StorageService,
    public router: Router,
    public platform: Platform,
    public routerOutlet: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if(this.router.url=='/utama' || this.router.url=='/login'){
        CapacitorApp.exitApp();
      }else{
        this.navCtrl.pop();
      }
    });
  }

  ngOnInit() {

  }

  validateInputs(){
    const txtKp = this.postData.txtKp.trim();
    const txtPass = this.postData.txtPass.trim();
    return (this.postData.txtKp && this.postData.txtPass && txtKp.length > 0 && txtPass.length > 0);
  }

  login() {
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe((res: any) => {

        if (res.status === 'Berjaya') {
          this.storageService.store('token', res.token);
          this.storageService.store('namaGuru', res.namaGuru);
          this.storageService.store('sekolah', res.sekolah);
          this.storageService.store('lencana', res.lencana);
          this.navCtrl.navigateRoot('/utama');
        } else {
          alert('No.K/P dan Kata Laluan salah. Sila masukkan No.K/P dan Kata Laluan SPSMA yang betul.');
        }
      });
    } else {
      console.log('error');
    }
  }
}

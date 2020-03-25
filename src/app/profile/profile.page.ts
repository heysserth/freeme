import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../http/user.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  formUser: FormGroup;
  userInfo;
  hasLoaded;
  constructor(private userSvr: UserService, private alertController: AlertController, private router: Router) { }

  initializeForm() {
    this.formUser = new FormGroup({
      name : new FormControl(''),
      email : new FormControl(''),
      mobile : new FormControl(''),
      nifnie : new FormControl(''),
      address : new FormControl(''),
      postalcode : new FormControl(''),
      password : new FormControl(''),
      balance : new FormControl(''),
      irpf : new FormControl(''),
    });
  }
  
  ngOnInit() {
    this.initializeForm();
    this.userSvr.getUserInfo().subscribe((response: any) => {
      if (response.status === 200) {
        this.userInfo = response.data;
        this.formUser.patchValue({
          name : response.data.User.name,
          email : response.data.User.email,
          mobile : response.data.User.mobile,
          nifnie : response.data.FreemeUser.nif_nie,
          address : response.data.User.address,
          postalcode : response.data.User.postalcode,
          password : response.data.User.password,
          balance : response.data.Balance,
          irpf : response.data.User.irpf,
        });
        this.hasLoaded = true;
      } else {
        this.presentAlert(response.message);
      }
    }, (error) => { this.presentAlert(error.message); });
  }

  async presentAlert(headerMsg) {
    const alert = await this.alertController.create({
      header: headerMsg,
      message: 'Inicia sesion nuevamente',
      buttons: ['Cerrar']
    });
    await alert.present().then(() => {
      this.router.navigateByUrl('/login');
    });
  }


}

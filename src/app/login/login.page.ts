import { UserService } from './../http/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  loading;
  isLoading;

  constructor(private userSvr: UserService, private router: Router,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.initializeForm();
  }
  // ionic@freeme.es Testing
  initializeForm() {
    this.formLogin = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      type: new FormControl('userpassword')
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.formLogin.valid) {
      this.userSvr.login(this.formLogin.value).subscribe((response: any) => {
        this.isLoading = false;
        if (response.status === 200) {
          sessionStorage.setItem('dstoken', response.data.dstoken);
          this.router.navigateByUrl('/profile');
        }
      }, async (error) => {
        this.isLoading = false;
        this.presentAlert(error.message);
      });
    } else {
      this.formLogin.markAllAsTouched();
      this.isLoading = false;
    }

  }

  async presentAlert(headerMsg) {
    const alert = await this.alertController.create({
      header: headerMsg,
      message: 'Intente nuevamente',
      buttons: ['Cerrar']
    });
    await alert.present().then(() => {
      this.initializeForm();
    });
  }

}

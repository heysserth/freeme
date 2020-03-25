import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Tu cuenta',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Facturación y ventas',
      url: '/reports',
      icon: 'receipt'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public authSrv: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    try {
      if (this.authSrv.isAuthenticated()) {
        this.router.navigate(['/profile']);
      } else {
       this.router.navigate(['/login']);
      }
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}

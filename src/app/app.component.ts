import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import './rxjs-operators.ts';
import { AuthService } from '../services/AuthService';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class LetsApp {
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    private authService: AuthService) {
    this.authService.loadToken();
    if (this.authService.isAuthenticated()) {
      this.rootPage = HomePage;
    }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

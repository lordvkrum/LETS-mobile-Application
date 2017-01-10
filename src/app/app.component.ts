import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import './rxjs-operators.ts';
import { AuthService } from '../services/AuthService';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { OfferPage } from '../pages/offer/offer';
import { MembersPage } from '../pages/members/members';

@Component({
  templateUrl: 'app.html'
})
export class LetsApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    private authService: AuthService) {
    this.authService.loadToken();
    if (this.authService.isAuthenticated()) {
      this.rootPage = HomePage;
    }
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Offers', component: OfferPage },
      { title: 'Members', component: MembersPage }
    ];
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authService.logout()
      .subscribe(
      result => this.nav.setRoot(LoginPage)
      );
  }
}

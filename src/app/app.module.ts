import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { LetsApp } from './app.component';
import { AppSettings } from './app.settings';
import { AuthService } from '../services/AuthService';
import { ConfigService } from '../services/ConfigService';
import { TransactionService } from '../services/TransactionService';
import { OfferService } from '../services/OfferService';
import { WantService } from '../services/WantService';
import { AlertService } from '../services/AlertService';
import { MemberService } from '../services/MemberService';
import { HttpBasicAuth } from '../services/HttpBasicAuth';
import { FormBuilderComponent } from '../components/formBuilder/formBuilder';
import { FieldBuilderComponent } from '../components/fieldBuilder/fieldBuilder';
import { ConfirmationBuilderComponent } from '../components/confirmationBuilder/confirmationBuilder';
import { moreActionsBuilderComponent } from '../components/moreActionsBuilder/moreActionsBuilder';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MenuOptionPopover } from '../pages/home/menu-option';
import { AddTransactionPage } from '../pages/addTransaction/addTransaction';
import { OffersPage } from '../pages/offers/offers';
import { OfferDetailPage } from '../pages/offerDetail/offerDetail';
import { AddOfferPage } from '../pages/addOffer/addOffer';
import { WantsPage } from '../pages/wants/wants';
import { WantDetailPage } from '../pages/wantDetail/wantDetail';
import { AddWantPage } from '../pages/addWant/addWant';
import { UnixTimeToMoment } from '../pipes/UnixTimeToMoment';
import { ObjectKeys } from '../pipes/ObjectKeys';
import { MembersPage } from '../pages/members/members';
import { MemberDetailPage } from '../pages/memberDetail/memberDetail';
import { ProfilePage } from '../pages/userProfile/userProfile';
import { ProfileEditPage } from '../pages/userProfileEdit/userProfileEdit';


@NgModule({
  declarations: [
    LetsApp,
    LoginPage,
    HomePage,
    MenuOptionPopover,
    AddTransactionPage,
    OffersPage,
    OfferDetailPage,
    AddOfferPage,
    WantsPage,
    WantDetailPage,
    AddWantPage,
    UnixTimeToMoment,
    ObjectKeys,
    MembersPage,
    MemberDetailPage,
    FormBuilderComponent,
    FieldBuilderComponent,
    ConfirmationBuilderComponent,
    moreActionsBuilderComponent,
    ProfilePage,
    ProfileEditPage
  ],
  imports: [
    IonicModule.forRoot(LetsApp),
    HttpModule,
    JsonpModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LetsApp,
    LoginPage,
    HomePage,
    MenuOptionPopover,
    ConfirmationBuilderComponent,
    moreActionsBuilderComponent,
    AddTransactionPage,
    OffersPage,
    OfferDetailPage,
    AddOfferPage,
    WantsPage,
    WantDetailPage,
    AddWantPage,
    MembersPage,
    MemberDetailPage,
    ProfilePage,
    ProfileEditPage
  ],
  providers: [ 
    AppSettings,
    AuthService,
    ConfigService,
    TransactionService,
    OfferService,
    WantService,
    AlertService,
    HttpBasicAuth,
    MemberService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }

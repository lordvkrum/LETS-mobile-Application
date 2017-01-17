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
import { AlertService } from '../services/AlertService';
import { MemberService } from '../services/MemberService';
import { CategoriesService } from '../services/CategoriesService';
import { FieldTypesService } from '../services/FieldTypesService';
import { HttpBasicAuth } from '../services/HttpBasicAuth';
import { FormBuilderComponent } from '../components/formBuilder/formBuilder';
import { FieldBuilderComponent } from '../components/fieldBuilder/fieldBuilder';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { OfferPage } from '../pages/offer/offer';
import { OfferDetailPage } from '../pages/offerDetail/offerDetail';
import { AddOfferPage } from '../pages/addOffer/addOffer';
import { UnixTimeToMoment } from '../pipes/UnixTimeToMoment';
import { ObjectKeys } from '../pipes/ObjectKeys';
import { MembersPage } from '../pages/members/members';
import { MemberDetailModal } from '../pages/memberDetail/memberDetail';


@NgModule({
  declarations: [
    LetsApp,
    LoginPage,
    HomePage,
    OfferPage,
    OfferDetailPage,
    AddOfferPage,
    UnixTimeToMoment,
    ObjectKeys,
    MembersPage,
    MemberDetailModal,
    FormBuilderComponent,
    FieldBuilderComponent
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
    OfferPage,
    OfferDetailPage,
    AddOfferPage,
    MembersPage,
    MemberDetailModal
  ],
  providers: [ 
    AppSettings,
    AuthService,
    ConfigService,
    TransactionService,
    OfferService,
    AlertService,
    CategoriesService,
    FieldTypesService,
    HttpBasicAuth,
    MemberService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }

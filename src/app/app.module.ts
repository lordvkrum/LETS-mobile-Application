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
import { MoreActionsBuilderComponent } from '../components/moreActionsBuilder/moreActionsBuilder';
import { FiltersBuilderComponent } from '../components/filtersBuilder/filtersBuilder';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MenuOptionPopover } from '../pages/home/menu-option';
import { TransactionsPage } from '../pages/transactions/transactions';
import { AddTransactionPage } from '../pages/addTransaction/addTransaction';
import { OffersPage } from '../pages/offers/offers';
import { OfferDetailPage } from '../pages/offerDetail/offerDetail';
import { AddOfferPage } from '../pages/addOffer/addOffer';
import { WantsPage } from '../pages/wants/wants';
import { WantDetailPage } from '../pages/wantDetail/wantDetail';
import { AddWantPage } from '../pages/addWant/addWant';
import { ContactPage } from '../pages/contact/contact';
import { CategoriesFilterPage } from '../pages/categories/categories';
import { KeywordsFilterPage } from '../pages/keywords/keywords';
import { UnixTimeToMoment } from '../pipes/UnixTimeToMoment';
import { ObjectKeys } from '../pipes/ObjectKeys';
import { MembersPage } from '../pages/members/members';
import { MemberDetailPage } from '../pages/memberDetail/memberDetail';
import { ProfilePage } from '../pages/userProfile/userProfile';


@NgModule({
  declarations: [
    LetsApp,
    LoginPage,
    HomePage,
    MenuOptionPopover,
    TransactionsPage,
    AddTransactionPage,
    OffersPage,
    OfferDetailPage,
    AddOfferPage,
    WantsPage,
    WantDetailPage,
    AddWantPage,
    ContactPage,
    CategoriesFilterPage,
    KeywordsFilterPage,
    UnixTimeToMoment,
    ObjectKeys,
    MembersPage,
    MemberDetailPage,
    FormBuilderComponent,
    FieldBuilderComponent,
    ConfirmationBuilderComponent,
    MoreActionsBuilderComponent,
    FiltersBuilderComponent,
    ProfilePage
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
    MoreActionsBuilderComponent,
    FiltersBuilderComponent,
    TransactionsPage,
    AddTransactionPage,
    OffersPage,
    OfferDetailPage,
    AddOfferPage,
    WantsPage,
    WantDetailPage,
    AddWantPage,
    ContactPage,
    CategoriesFilterPage,
    KeywordsFilterPage,
    MembersPage,
    MemberDetailPage,
    ProfilePage
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

import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { ConfirmationBuilderComponent } from '../../components/confirmationBuilder/confirmationBuilder';
import { moreActionsBuilderComponent } from '../../components/moreActionsBuilder/moreActionsBuilder';
import { OffersPage } from '../../pages/offers/offers';
import { Offer } from '../../domain/Offer';

@Component({
	selector: 'page-add-offer',
	templateUrl: 'addOffer.html'
})
export class AddOfferPage implements OnInit {
	private definitionOffer: any;
	private fields: Array<any>;
	private offer: Offer;
	private isValid: boolean = false;
	private loader: Loading
	private isLoaded: boolean = false;
	private popover: Popover;

	constructor(public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private authService: AuthService,
		private offerService: OfferService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.isLoaded = false;
		this.viewCtrl.didEnter.subscribe(
			response => {
				if (!this.isLoaded) {
					this.loader = this.loadingCtrl.create({
						content: 'Please wait...'
					});
					this.loader.present();
					this.authService.userInfo.subscribe(
						userInfo => {
							this.offerService.describe().subscribe(
								response => {
									this.isLoaded = true;
									this.definitionOffer = response;
									if (this.definitionOffer.POST.user_id) {
										this.definitionOffer.POST.user_id.default = userInfo.name;
									}
									this.fields = this.definitionOffer.POST;
									this.loader.dismiss();
								},
								error => {
									this.alertService.showError(error);
									this.loader.dismiss();
								});
						});
				}
			});
	}

	onChanged(options: { value: Offer, isValid: boolean }) {
		this.offer = options.value;
		this.isValid = options.isValid;
	}

	addOffer() {
		this.popover = this.popoverCtrl.create(ConfirmationBuilderComponent, {
			fields: this.definitionOffer.POST,
			operation: 'Offer'
		}, {
				cssClass: 'confirm-popover',
				enableBackdropDismiss: false
			});
		this.popover.onDidDismiss((data) => {
			if (data && data.hasConfirmed) {
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.offerService.post(this.offer).subscribe(
					response => {
						this.loader.dismiss();
						this.popover = this.popoverCtrl.create(moreActionsBuilderComponent, {
							operation: 'Offer',
							options: [{
								title: 'Record Offer',
								icon: 'ion-edit',
								page: AddOfferPage
							}, {
								title: 'List Offerings',
								icon: 'ion-pricetag',
								page: OffersPage
							}]
						}, {
								cssClass: 'confirm-popover',
								enableBackdropDismiss: false
							});
						this.popover.present();
					},
					error => {
						this.alertService.showError(error);
						this.loader.dismiss();
					});
			}
		});
		this.popover.present();
	}
}

import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, Loading } from 'ionic-angular';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
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

	constructor(public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
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
					this.offerService.describe().subscribe(
						response => {
							this.isLoaded = true;
							this.definitionOffer = response;
							this.fields = this.definitionOffer.POST;
							this.loader.dismiss();
						},
						error => {
							this.alertService.showError(error);
							this.loader.dismiss();
						});
				}
			});
	}

	onChanged(options: { value: Offer, isValid: boolean }) {
		this.offer = options.value;
		this.isValid = options.isValid;
	}

	addOffer() {
		this.offerService.post(this.offer).subscribe(
			response => this.viewCtrl.dismiss(),
			error => this.alertService.showError(error));
	}

	onConfirmed(offer: Offer) {
		this.offer = offer;
		this.offerService.post(this.offer).subscribe(
			response => this.viewCtrl.dismiss({
				success: true
			}),
			error => this.alertService.showError(error));
	}
}

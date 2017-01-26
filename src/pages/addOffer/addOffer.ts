import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
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

	constructor(private viewCtrl: ViewController,
		private offerService: OfferService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.offerService.describe()
			.subscribe(
			response => {
				this.definitionOffer = response;
				this.fields = this.definitionOffer.POST;
			},
			error => this.alertService.showError('Connection problem!')
			);
	}

	onCreated(offer: Offer) {
		this.offer = offer;
		this.offerService.post(this.offer)
			.subscribe(
			response => this.viewCtrl.dismiss({
				success: true
			}),
			error => this.alertService.showError(error)
			);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}

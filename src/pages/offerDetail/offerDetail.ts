import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { Offer } from '../../domain/Offer';

@Component({
	selector: 'page-offer-detail',
	templateUrl: 'offerDetail.html'
})
export class OfferDetailPage implements OnInit {
	private definitionOffer: any;
	private offer: Offer;

	constructor(private params: NavParams,
		private viewCtrl: ViewController,
		private offerService: OfferService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.offerService.describe()
			.subscribe(
			response => this.definitionOffer = response,
			error => this.alertService.showError('Connection problem!')
			);
		this.offerService.get(this.params.get('id'))
			.subscribe(
			response => this.offer = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}

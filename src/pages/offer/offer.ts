import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { Offer } from '../../domain/Offer';
import { OfferDetailPage } from '../offerDetail/offerDetail';
import { AddOfferPage } from '../addOffer/addOffer';

@Component({
	selector: 'page-offer',
	templateUrl: 'offer.html'
})
export class OfferPage implements OnInit {
	private definition_offer: any;
	private offers: Array<Offer>;

	constructor(private modalCtrl: ModalController,
		private offerService: OfferService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.offerService.describe()
			.subscribe(
			response => this.definition_offer = response,
			error => this.alertService.showError('Connection problem!')
			);
		this.offerService.list()
			.subscribe(
			response => this.offers = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	showDetails(id): void {
		let modal = this.modalCtrl.create(OfferDetailPage, {
			id: id
		});
		modal.present();
	}

	addOffer(): void {
		let modal = this.modalCtrl.create(AddOfferPage);
		modal.present();
	}
}

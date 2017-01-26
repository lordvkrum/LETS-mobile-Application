import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { Offer } from '../../domain/Offer';
import { OfferDetailPage } from '../offerDetail/offerDetail';
import { MemberDetailModal } from '../memberDetail/memberDetail';
import { AddOfferPage } from '../addOffer/addOffer';

@Component({
	selector: 'page-offer',
	templateUrl: 'offer.html'
})
export class OfferPage implements OnInit {
	private canPost = false;
	private success = false;
	private definitionOffer: any;
	private offers: Array<Offer>;

	constructor(private modalCtrl: ModalController,
		private offerService: OfferService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.offerService.describe()
			.subscribe(
			response => {
				this.definitionOffer = response;
				this.canPost = !!this.definitionOffer.POST;
			},
			error => this.alertService.showError('Connection problem!')
			);
		this.loadOffers();
	}

	loadOffers() {
		this.offerService.list()
			.subscribe(
			response => this.offers = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	showDetails(id) {
		let modal = this.modalCtrl.create(OfferDetailPage, {
			id: id
		});
		modal.present();
	}

	showMember(userId) {
		let modal = this.modalCtrl.create(MemberDetailModal, {
			memberId: userId
		});
		modal.present();
	}

	addOffer() {
		let modal = this.modalCtrl.create(AddOfferPage);
		modal.onDidDismiss((data: any = {}) => {
			this.success = data.success;
			this.loadOffers();
		});
		modal.present();
	}
}

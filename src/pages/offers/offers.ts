import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, LoadingController, Loading } from 'ionic-angular';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { Offer } from '../../domain/Offer';
import { OfferDetailPage } from '../offerDetail/offerDetail';
import { AddOfferPage } from '../addOffer/addOffer';
import * as $ from 'jquery';

@Component({
	selector: 'page-offers',
	templateUrl: 'offers.html'
})
export class OffersPage implements OnInit {
	private canPost = false;
	private definitionOffer: any;
	private offers: Array<Offer>;
	private loader: Loading

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private offerService: OfferService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.offerService.describe().subscribe(
					response => {
						this.definitionOffer = response;
						this.canPost = !!this.definitionOffer.POST;
						if (this.canPost) {
							$('page-offers ion-content.content').children().css('margin-bottom', '90px');
						}
					},
					error => this.alertService.showError(error));
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.loadOffers();
			});
	}

	loadOffers() {
		this.offerService.list().subscribe(
			response => {
				this.offers = response;
				this.loader.dismiss();
			},
			error => {
				this.alertService.showError(error);
				this.loader.dismiss();
			});
	}

	showDetails(id) {
		// let modal = this.modalCtrl.create(OfferDetailPage, {
		// 	id: id
		// });
		// modal.present();
	}

	addOffer() {
		this.navCtrl.push(AddOfferPage);
	}
}

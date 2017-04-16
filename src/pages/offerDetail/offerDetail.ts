import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, NavController, LoadingController, Loading } from 'ionic-angular';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { MemberDetailPage } from '../memberDetail/memberDetail';
import { Offer } from '../../domain/Offer';
import { map } from 'lodash';

@Component({
	selector: 'page-offer-detail',
	templateUrl: 'offerDetail.html'
})
export class OfferDetailPage implements OnInit {
	private definitionOffer: any;
	private offer: Offer;
	private loader: Loading
	private imageExpanded: boolean;

	constructor(private params: NavParams,
		private viewCtrl: ViewController,
		private navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private offerService: OfferService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.imageExpanded = false;
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.offerService.describe().subscribe(
					response => {
						this.definitionOffer = response;
						this.offerService.get(this.params.get('id')).subscribe(
							response => {
								for (let i in this.definitionOffer.POST) {
									let field = this.definitionOffer.POST[i];
									if (field.type === 'select') {
										if (field.multiple) {
											response[`$${i}`] = map(response[i], (option: any) => field.options[option]).join(', ');
										} else {
											response[`$${i}`] = field.options[response[i]];
										}
									}
								}
								this.offer = response;
								this.loader.dismiss();
							},
							error => {
								this.alertService.showError(error);
								this.loader.dismiss();
							});
					},
					error => {
						this.alertService.showError(error);
						this.loader.dismiss();
					});
			});
	}

	showMember(userId) {
		this.navCtrl.push(MemberDetailPage, {
			id: userId
		});
	}

	expandImage() {
		this.imageExpanded = !this.imageExpanded;
	}
}

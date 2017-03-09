import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, LoadingController, Loading } from 'ionic-angular';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { Want } from '../../domain/Want';
import { WantDetailPage } from '../wantDetail/wantDetail';
import { AddWantPage } from '../addWant/addWant';
import * as $ from 'jquery';

@Component({
	selector: 'page-wants',
	templateUrl: 'wants.html'
})
export class WantsPage implements OnInit {
	private canPost = false;
	private definitionWant: any;
	private wants: Array<Want>;
	private loader: Loading;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.wantService.describe().subscribe(
					response => {
						this.definitionWant = response;
						this.canPost = !!this.definitionWant.POST;
						if (this.canPost) {
							$('page-offers ion-content.content').children().css('margin-bottom', '90px');
						}
					},
					error => this.alertService.showError(error));
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.loadWants();
			});
	}

	loadWants() {
		this.wantService.list().subscribe(
			response => {
				this.wants = response;
				this.loader.dismiss();
			},
			error => {
				this.alertService.showError(error);
				this.loader.dismiss();
			});
	}

	showDetails(id): void {
		// let modal = this.modalCtrl.create(WantDetailPage, {
		// 	id: id
		// });
		// modal.present();
	}

	addWant(): void {
		this.navCtrl.push(AddWantPage);
	}
}

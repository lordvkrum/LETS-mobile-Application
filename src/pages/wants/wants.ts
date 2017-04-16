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
	private page: number;
	private isLoading: boolean;
	private hasNoMoreData: boolean;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.setPagination();
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.page = 1;
				this.hasNoMoreData = false;
				this.isLoading = false;
				this.wants = [];
				this.wantService.describe().subscribe(
					response => {
						this.definitionWant = response;
						this.canPost = !!this.definitionWant.POST;
						if (this.canPost) {
							$('page-wants ion-content.content').children().css('margin-bottom', '90px');
						}
					},
					error => this.alertService.showError(error));
				this.loadWants();
			});
	}

	setPagination() {
		$('page-wants .scroll-content').on('scroll', (ev) => {
			if (this.hasNoMoreData || this.isLoading) {
				return;
			}
			if ((ev.target.scrollHeight - ev.target.scrollTop) < 600) {
				this.loadWants();
			}
		});
	}

	loadWants() {
		if (this.hasNoMoreData || this.isLoading) {
			return;
		}
		this.isLoading = true;
		this.loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loader.present();
		this.wantService.list(this.page).subscribe(
			response => {
				if (!response.length) {
					this.hasNoMoreData = true;
				}
				this.wants = this.wants.concat(response);
				this.page++;
				this.loader.dismiss();
				this.isLoading = false;
			},
			error => {
				this.alertService.showError(error);
				this.loader.dismiss();
				this.isLoading = false;
			});
	}

	showDetails(id) {
		this.navCtrl.push(WantDetailPage, {
			id: id
		});
	}

	addWant() {
		this.navCtrl.push(AddWantPage);
	}
}

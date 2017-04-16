import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, NavController, LoadingController, Loading } from 'ionic-angular';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { MemberDetailPage } from '../memberDetail/memberDetail';
import { Want } from '../../domain/Want';
import { map } from 'lodash';

@Component({
	selector: 'page-want-detail',
	templateUrl: 'wantDetail.html'
})
export class WantDetailPage implements OnInit {
	private definitionWant: any;
	private want: Want;
	private loader: Loading
	private imageExpanded: boolean;

	constructor(private params: NavParams,
		private viewCtrl: ViewController,
		private navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.imageExpanded = false;
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.wantService.describe().subscribe(
					response => {
						this.definitionWant = response;
						this.wantService.get(this.params.get('id')).subscribe(
							response => {
								for (let i in this.definitionWant.POST) {
									let field = this.definitionWant.POST[i];
									if (field.type === 'select') {
										if (field.multiple) {
											response[`$${i}`] = map(response[i], (option: any) => field.options[option]).join(', ');
										} else {
											response[`$${i}`] = field.options[response[i]];
										}
									}
								}
								this.want = response;
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

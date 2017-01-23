import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, ModalController } from 'ionic-angular';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { MemberDetailModal } from '../memberDetail/memberDetail';
import { Want } from '../../domain/Want';

@Component({
	selector: 'page-want-detail',
	templateUrl: 'wantDetail.html'
})
export class WantDetailPage implements OnInit {
	private definitionWant: any;
	private want: Want;

	constructor(private params: NavParams,
		private viewCtrl: ViewController,
		private modalCtrl: ModalController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.wantService.describe()
			.subscribe(
			response => this.definitionWant = response,
			error => this.alertService.showError('Connection problem!')
			);
		this.wantService.get(this.params.get('id'))
			.subscribe(
			response => this.want = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	showMember(userId) {
		let modal = this.modalCtrl.create(MemberDetailModal, {
			memberId: userId
		});
		modal.present();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}

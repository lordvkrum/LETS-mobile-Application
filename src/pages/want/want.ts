import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { Want } from '../../domain/Want';
import { WantDetailPage } from '../wantDetail/wantDetail';
import { MemberDetailModal } from '../memberDetail/memberDetail';
import { AddWantPage } from '../addWant/addWant';

@Component({
	selector: 'page-want',
	templateUrl: 'want.html'
})
export class WantPage implements OnInit {
	private canPost = false;
	private success = false;
	private definitionWant: any;
	private wants: Array<Want>;

	constructor(private modalCtrl: ModalController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.wantService.describe()
			.subscribe(
			response => {
				this.definitionWant = response;
				this.canPost = !!this.definitionWant.POST;
			},
			error => this.alertService.showError('Connection problem!')
			);
		this.loadWants();
	}

	loadWants() {
		this.wantService.list()
			.subscribe(
			response => this.wants = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	showDetails(id): void {
		let modal = this.modalCtrl.create(WantDetailPage, {
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

	addWant(): void {
		let modal = this.modalCtrl.create(AddWantPage);
		modal.onDidDismiss((data: any = {}) => {
			this.success = data.success;
			this.loadWants();
		});
		modal.present();
	}
}

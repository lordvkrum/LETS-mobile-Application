import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { Want } from '../../domain/Want';

@Component({
	selector: 'page-add-want',
	templateUrl: 'addWant.html'
})
export class AddWantPage implements OnInit {
	private definitionWant: any;
	private fields: Array<any>;
	private want: Want;

	constructor(private viewCtrl: ViewController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.wantService.describe()
			.subscribe(
			response => {
				this.definitionWant = response;
				this.fields = this.definitionWant.POST;
			},
			error => this.alertService.showError('Connection problem!')
			);
	}

	onCreated(want: Want) {
		this.want = want;
		this.wantService.post(this.want)
			.subscribe(
			response => this.viewCtrl.dismiss({
				success: true
			}),
			error => this.alertService.showError(error)
			);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}

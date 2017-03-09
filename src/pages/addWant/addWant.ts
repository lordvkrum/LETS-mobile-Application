import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, Loading } from 'ionic-angular';
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
	private isValid: boolean = false;
	private loader: Loading
	private isLoaded: boolean = false;

	constructor(private viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.isLoaded = false;
		this.viewCtrl.didEnter.subscribe(
			response => {
				if (!this.isLoaded) {
					this.loader = this.loadingCtrl.create({
						content: 'Please wait...'
					});
					this.loader.present();
					this.wantService.describe().subscribe(
						response => {
							this.isLoaded = true;
							this.definitionWant = response;
							this.fields = this.definitionWant.POST;
							this.loader.dismiss();
						},
						error => {
							this.alertService.showError(error);
							this.loader.dismiss();
						});
				}
			});
	}

	onChanged(options: { value: Want, isValid: boolean }) {
		this.want = options.value;
		this.isValid = options.isValid;
	}

	addOffer() {
		this.wantService.post(this.want).subscribe(
			response => this.viewCtrl.dismiss(),
			error => this.alertService.showError(error));
	}

	onConfirmed(want: Want) {
		this.want = want;
		this.wantService.post(this.want).subscribe(
			response => this.viewCtrl.dismiss({
				success: true
			}),
			error => this.alertService.showError(error));
	}
}

import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { ConfirmationBuilderComponent } from '../../components/confirmationBuilder/confirmationBuilder';
import { moreActionsBuilderComponent } from '../../components/moreActionsBuilder/moreActionsBuilder';
import { WantsPage } from '../../pages/wants/wants';
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
	private popover: Popover;

	constructor(private viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private authService: AuthService,
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
					this.authService.userInfo.subscribe(
						userInfo => {
							this.wantService.describe().subscribe(
								response => {
									this.isLoaded = true;
									this.definitionWant = response;
									if (this.definitionWant.POST.user_id) {
										this.definitionWant.POST.user_id.default = userInfo.name;
									}
									this.fields = this.definitionWant.POST;
									this.loader.dismiss();
								},
								error => {
									this.alertService.showError(error);
									this.loader.dismiss();
								});
						});
				}
			});
	}

	onChanged(options: { value: Want, isValid: boolean }) {
		this.want = options.value;
		this.isValid = options.isValid;
	}

	addWant() {
		this.popover = this.popoverCtrl.create(ConfirmationBuilderComponent, {
			fields: this.definitionWant.POST,
			operation: 'Want'
		}, {
				enableBackdropDismiss: false
			});
		this.popover.onDidDismiss((data) => {
			if (data && data.hasConfirmed) {
				this.wantService.post(this.want).subscribe(
					response => {
						this.popover = this.popoverCtrl.create(moreActionsBuilderComponent, {
							operation: 'Want',
							options: [{
								title: 'Record Want',
								icon: 'ion-edit',
								page: AddWantPage
							}, {
								title: 'List Wantings',
								icon: 'ion-pin',
								page: WantsPage
							}]
						}, {
								enableBackdropDismiss: false
							});
						this.popover.present();
					},
					error => this.alertService.showError(error));
			}
		});
		this.popover.present();
	}
}

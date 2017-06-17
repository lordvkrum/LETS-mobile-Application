import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { ConfirmationBuilderComponent } from '../../components/confirmationBuilder/confirmationBuilder';
import { MoreActionsBuilderComponent } from '../../components/moreActionsBuilder/moreActionsBuilder';
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
	private editWant: Want;

	constructor(private viewCtrl: ViewController,
		private navParams: NavParams,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private authService: AuthService,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.isLoaded = false;
		if (this.navParams.data) {
			this.editWant = this.navParams.data.want;
		}
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
									if (this.editWant) {
										for (let i in this.editWant) {
											if (this.editWant[i] && this.definitionWant.POST[i]) {
												this.definitionWant.POST[i].default = this.editWant[i];
											}
										}
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
				cssClass: 'confirm-popover',
				enableBackdropDismiss: false
			});
		this.popover.onDidDismiss((data) => {
			if (data && data.hasConfirmed) {
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.wantService.post(this.want).subscribe(
					response => {
						this.loader.dismiss();
						this.popover = this.popoverCtrl.create(MoreActionsBuilderComponent, {
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
								cssClass: 'confirm-popover',
								enableBackdropDismiss: false
							});
						this.popover.present();
					},
					error => {
						this.alertService.showError(error);
						this.loader.dismiss();
					});
			}
		});
		this.popover.present();
	}
}

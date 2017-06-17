import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { ConfirmationBuilderComponent } from '../../components/confirmationBuilder/confirmationBuilder';
import { MoreActionsBuilderComponent } from '../../components/moreActionsBuilder/moreActionsBuilder';
import { FiltersBuilderComponent } from '../../components/filtersBuilder/filtersBuilder';
import { WantsPage } from '../../pages/wants/wants';
import { OffersPage } from '../../pages/offers/offers';
import { Member } from '../../domain/Member';

@Component({
	selector: 'page-user-profile',
	templateUrl: 'userProfile.html'
})
export class ProfilePage implements OnInit {
	private definitionMember: any;
	private fields: Array<any>;
	private member: Member;
	private user: Member;
	private isValid: boolean = false;
	private loader: Loading
	private isLoaded: boolean = false;
	private popover: Popover;

	constructor(public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private authService: AuthService,
		private memberService: MemberService,
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
							this.user = userInfo;
							this.memberService.describe(this.user).subscribe(
								response => {
									this.isLoaded = true;
									this.definitionMember = response;
									for (let i in this.user) {
										if (this.user[i] && this.definitionMember.PATCH[i]) {
											this.definitionMember.PATCH[i].default = this.user[i];
										}
									}
									this.fields = this.definitionMember.PATCH;
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

	onChanged(options: { value: Member, isValid: boolean }) {
		this.member = options.value;
		this.isValid = options.isValid;
	}

	editProfile() {
		this.popover = this.popoverCtrl.create(ConfirmationBuilderComponent, {
			fields: this.definitionMember.PATCH,
			operation: 'My Account'
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
				this.memberService.post(this.member).subscribe(
					response => {
						this.loader.dismiss();
						this.popover = this.popoverCtrl.create(MoreActionsBuilderComponent, {
							operation: 'Offer',
							options: [{
								title: 'List Offerings',
								icon: 'ion-pricetag',
								page: OffersPage
							}, {
								title: 'List Wants',
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

	showActions() {
		this.popover = this.popoverCtrl.create(FiltersBuilderComponent, {
			options: [{
				title: 'Show My Offerings',
				page: OffersPage,
				params: {
					filter: `&user_id=${this.user.id}`,
					filterName: `user: ${this.user.mail}`,
					myActions: true
				}
			}, {
				title: 'Show My Wants',
				page: WantsPage,
				params: {
					filter: `&user_id=${this.user.id}`,
					filterName: `user: ${this.user.mail}`,
					myActions: true
				}
			}]
		}, {
				cssClass: 'confirm-popover',
				enableBackdropDismiss: true
			});
		this.popover.present();
	}
}

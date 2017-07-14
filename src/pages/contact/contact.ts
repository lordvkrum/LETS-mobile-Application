import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { MembersPage } from '../../pages/members/members';
import { ConfirmationBuilderComponent } from '../../components/confirmationBuilder/confirmationBuilder';
import { MoreActionsBuilderComponent } from '../../components/moreActionsBuilder/moreActionsBuilder';
import { Member } from '../../domain/Member';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
	private fields: any;
	private sendTo: Member;
	private member: Member;
	private message: any;
	private isValid: boolean = false;
	private loader: Loading
	private isLoaded: boolean = false;
	private popover: Popover;

	constructor(public viewCtrl: ViewController,
		private navParams: NavParams,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private authService: AuthService,
		private memberService: MemberService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.isLoaded = false;
		if (this.navParams.data) {
			this.sendTo = this.navParams.data.sendTo;
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
							this.member = userInfo;
							this.isLoaded = true;
							this.fields = {
								to: {
			            label: 'To',
			            type: 'textfield',
			            default: this.sendTo.name,
			            required: true
				        },
								subject: {
			            label: 'Subject',
			            type: 'textfield',
			            required: true
				        },
								body: {
			            label: 'Message',
			            type: 'textarea',
			            lines: 5,
			            required: true
				        }
							};
							this.loader.dismiss();
						});
				}
			});
	}

	onChanged(options: { value: any, isValid: boolean }) {
		this.message = options.value;
		this.isValid = options.isValid;
	}

	sendMessage() {
		this.popover = this.popoverCtrl.create(ConfirmationBuilderComponent, {
			fields: this.fields,
			operation: 'Contact'
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
				this.memberService.contact(this.sendTo, this.message).subscribe(
					response => {
						this.loader.dismiss();
						this.popover = this.popoverCtrl.create(MoreActionsBuilderComponent, {
							operation: 'Contact',
							options: [{
								title: 'List Users',
								icon: 'ion-person',
								page: MembersPage
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

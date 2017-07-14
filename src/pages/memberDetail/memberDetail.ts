import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { FiltersBuilderComponent } from '../../components/filtersBuilder/filtersBuilder';
import { ContactPage } from '../contact/contact';
import { Member } from '../../domain/Member';

@Component({
	selector: 'page-memberDetail',
	templateUrl: 'memberDetail.html'
})
export class MemberDetailPage implements OnInit {
	private member: Member;
	private loader: Loading;
	private popover: Popover;

	constructor(private params: NavParams,
		private viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private memberService: MemberService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.memberService.get(this.params.get('id')).subscribe(
					response => {
						this.member = response;
						this.loader.dismiss();
					},
					error => {
						this.alertService.showError(error);
						this.loader.dismiss();
					});
			});
	}

	showActions() {
		this.popover = this.popoverCtrl.create(FiltersBuilderComponent, {
			options: [{
				title: 'Contact User',
				page: ContactPage,
				params: {
					sendTo: this.member
				}
			}]
		}, {
				cssClass: 'confirm-popover',
				enableBackdropDismiss: true
			});
		this.popover.present();
	}

}

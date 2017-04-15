import { Component, OnInit } from '@angular/core';
import { ViewController, ModalController, NavController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { Member } from '../../domain/Member';
import { MemberDetailModal } from '../memberDetail/memberDetail';
import * as $ from 'jquery';

@Component({
	selector: 'page-members',
	templateUrl: 'members.html'
})
export class MembersPage implements OnInit {
	private username: string;
	private members: Array<Member>;
	private loader: Loading
	private page: number;
	private isLoading: boolean;
	private hasNoMoreData: boolean;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private authService: AuthService,
		private memberService: MemberService,
		private alertService: AlertService) {
		this.authService.userInfo.subscribe(
			userInfo => {
				this.username = userInfo.name;
			});
	}

	ngOnInit(): void {
		this.setPagination();
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.page = 1;
				this.hasNoMoreData = false;
				this.isLoading = false;
				this.members = [];
				this.loadMembers();
			});
	}

	setPagination() {
		$('page-members .scroll-content').on('scroll', (ev) => {
			if (this.hasNoMoreData || this.isLoading) {
				return;
			}
			if ((ev.target.scrollHeight - ev.target.scrollTop) < 700) {
				this.loadMembers();
			}
		});
	}

	loadMembers() {
		if (this.hasNoMoreData || this.isLoading) {
			return;
		}
		this.isLoading = true;
		this.loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loader.present();
		this.memberService.list(this.page).subscribe(
			response => {
				if (!response.length) {
					this.hasNoMoreData = true;
				}
				this.members = this.members.concat(response);
				this.page++;
				this.loader.dismiss();
				this.isLoading = false;
			},
			error => {
				this.alertService.showError(error);
				this.loader.dismiss();
				this.isLoading = false;
			});
	}

	presentDetailModal(id) {
		let modal = this.modalCtrl.create(MemberDetailModal, { memberId: id });
		modal.present();
	}
}

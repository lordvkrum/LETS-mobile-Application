import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { Member } from '../../domain/Member';
import { MemberDetailPage } from '../memberDetail/memberDetail';
import { KeywordsFilterPage } from '../keywords/keywords';
import { FiltersBuilderComponent } from '../../components/filtersBuilder/filtersBuilder';
import * as $ from 'jquery';

@Component({
	selector: 'page-members',
	templateUrl: 'members.html'
})
export class MembersPage implements OnInit {
	private members: Array<Member>;
	private loader: Loading
	private popover: Popover;
	private page: number;
	private isLoading: boolean;
	private hasNoMoreData: boolean;
	private filter: any;
	private filterName: string;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		private navParams: NavParams,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private memberService: MemberService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.setPagination();
		if (this.navParams.data) {
			this.filter = this.navParams.data.filter;
			this.filterName = this.navParams.data.filterName;
		}
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
		this.memberService.list(this.page, this.filter).subscribe(
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

	showDetails(id) {
		this.navCtrl.push(MemberDetailPage, {
			id: id
		});
	}

	showFilters() {
		this.popover = this.popoverCtrl.create(FiltersBuilderComponent, {
			options: [{
				title: 'Show By Keyword',
				page: KeywordsFilterPage,
				params: {
					title: 'Members',
					page: MembersPage
				}
			}, {
				title: 'Clear Filters',
				page: MembersPage
			}]
		}, {
				cssClass: 'confirm-popover',
				enableBackdropDismiss: true
			});
		this.popover.present();
	}
}

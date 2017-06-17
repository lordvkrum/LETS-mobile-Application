import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { WantService } from '../../services/WantService';
import { AlertService } from '../../services/AlertService';
import { Want } from '../../domain/Want';
import { WantDetailPage } from '../wantDetail/wantDetail';
import { AddWantPage } from '../addWant/addWant';
import { CategoriesFilterPage } from '../categories/categories';
import { KeywordsFilterPage } from '../keywords/keywords';
import { ConfirmationBuilderComponent } from '../../components/confirmationBuilder/confirmationBuilder';
import { FiltersBuilderComponent } from '../../components/filtersBuilder/filtersBuilder';
import * as $ from 'jquery';
import { map } from 'lodash';

@Component({
	selector: 'page-wants',
	templateUrl: 'wants.html'
})
export class WantsPage implements OnInit {
	private canPost = false;
	private definitionWant: any;
	private wants: Array<Want>;
	private loader: Loading;
	private popover: Popover;
	private page: number;
	private isLoading: boolean;
	private hasNoMoreData: boolean;
	private filter: any;
	private filterName: string;
	private myActions: boolean;
	private deleteWantConfirmDialog: boolean;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		private navParams: NavParams,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private wantService: WantService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.setPagination();
		if (this.navParams.data) {
			this.filter = this.navParams.data.filter;
			this.filterName = this.navParams.data.filterName;
			this.myActions = this.navParams.data.myActions;
		}
		this.viewCtrl.didEnter.subscribe(
			response => {
				if (this.deleteWantConfirmDialog) {
					return;
				}
				this.initPage();
			});
	}

	initPage() {
		this.page = 1;
		this.hasNoMoreData = false;
		this.isLoading = false;
		this.wants = [];
		this.wantService.describe().subscribe(
			response => {
				this.definitionWant = response;
				this.canPost = !!this.definitionWant.POST;
				if (this.canPost) {
					$('page-wants ion-content.content').children().css('margin-bottom', '90px');
				}
			},
			error => this.alertService.showError(error));
		this.loadWants();
	}

	setPagination() {
		$('page-wants .scroll-content').on('scroll', (ev) => {
			if (this.hasNoMoreData || this.isLoading) {
				return;
			}
			if ((ev.target.scrollHeight - ev.target.scrollTop) < 600) {
				this.loadWants();
			}
		});
	}

	loadWants() {
		if (this.hasNoMoreData || this.isLoading) {
			return;
		}
		this.isLoading = true;
		this.loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loader.present();
		this.wantService.list(this.page, this.filter).subscribe(
			response => {
				if (!response.length) {
					this.hasNoMoreData = true;
				}
				this.wants = this.wants.concat(response);
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
		this.navCtrl.push(WantDetailPage, {
			id: id
		});
	}

	addWant() {
		this.navCtrl.push(AddWantPage);
	}

	editWant(want: Want) {
		this.navCtrl.push(AddWantPage, {
			want: want
		});
	}

	deleteWant(id) {
		this.popover = this.popoverCtrl.create(ConfirmationBuilderComponent, {
			fields: this.definitionWant.POST,
			operation: 'Delete Want'
		}, {
				cssClass: 'confirm-popover',
				enableBackdropDismiss: false
			});
		this.deleteWantConfirmDialog = true;
		this.popover.onDidDismiss((data) => {
			this.deleteWantConfirmDialog = false;
			if (data && data.hasConfirmed) {
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.wantService.delete(id).subscribe(
					response => {
						this.loader.dismiss();
						this.initPage();
					},
					error => {
						this.alertService.showError(error);
						this.loader.dismiss();
					});
			}
		});
		this.popover.present();
	}

	showFilters() {
		this.popover = this.popoverCtrl.create(FiltersBuilderComponent, {
			options: [{
				// 	title: 'Show Latest',
				// 	page: WantsPage
				// }, {
				title: 'Show By Categories',
				page: CategoriesFilterPage,
				params: {
					categories: map(this.definitionWant.POST.category.options, (category, key) => {
						return { id: key, name: category };
					}),
					title: 'Wants',
					page: WantsPage
				}
			}, {
				title: 'Show By Keyword',
				page: KeywordsFilterPage,
				params: {
					title: 'Wants',
					page: WantsPage
				}
			}, {
				title: 'Clear Filters',
				page: WantsPage
			}]
		}, {
				cssClass: 'confirm-popover',
				enableBackdropDismiss: true
			});
		this.popover.present();
	}
}

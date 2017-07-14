import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController, Loading, PopoverController, Popover } from 'ionic-angular';
import { TransactionService } from '../../services/TransactionService';
import { AlertService } from '../../services/AlertService';
import { Transaction } from '../../domain/Transaction';
import { CategoriesFilterPage } from '../categories/categories';
import { KeywordsFilterPage } from '../keywords/keywords';
import { FiltersBuilderComponent } from '../../components/filtersBuilder/filtersBuilder';
import * as $ from 'jquery';
import { map } from 'lodash';

@Component({
	selector: 'page-transactions',
	templateUrl: 'transactions.html'
})
export class TransactionsPage implements OnInit {
	private definitionTransaction: any;
	private transactions: Array<Transaction>;
	private loader: Loading;
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
		private transactionService: TransactionService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.setPagination();
		if (this.navParams.data) {
			this.filter = this.navParams.data.filter;
			this.filterName = this.navParams.data.filterName;
		}
		this.viewCtrl.didEnter.subscribe(
			response => {
				this.initPage();
			});
	}

	initPage() {
		this.page = 1;
		this.hasNoMoreData = false;
		this.isLoading = false;
		this.transactions = [];
		this.transactionService.describe().subscribe(
			response => {
				this.definitionTransaction = response;
			},
			error => this.alertService.showError(error));
		this.loadTransactions();
	}

	setPagination() {
		$('page-transactions .scroll-content').on('scroll', (ev) => {
			if (this.hasNoMoreData || this.isLoading) {
				return;
			}
			if ((ev.target.scrollHeight - ev.target.scrollTop) < 600) {
				this.loadTransactions();
			}
		});
	}

	loadTransactions() {
		if (this.hasNoMoreData || this.isLoading) {
			return;
		}
		this.isLoading = true;
		this.loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loader.present();
		this.transactionService.list(this.page, this.filter).subscribe(
			response => {
				if (!response.length) {
					this.hasNoMoreData = true;
				}
				this.transactions = this.transactions.concat(response);
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

	showFilters() {
		this.popover = this.popoverCtrl.create(FiltersBuilderComponent, {
			options: [{
				// 	title: 'Show Latest',
				// 	page: TransactionsPage
				// }, {
				title: 'Show By Categories',
				page: CategoriesFilterPage,
				params: {
					categories: map(this.definitionTransaction.POST.category.options, (category, key) => {
						return { id: key, name: category };
					}),
					title: 'Trading Records',
					page: TransactionsPage
				}
			}, {
				title: 'Show By Keyword',
				page: KeywordsFilterPage,
				params: {
					title: 'Trading Records',
					page: TransactionsPage
				}
			}, {
				title: 'Clear Filters',
				page: TransactionsPage
			}]
		}, {
				cssClass: 'confirm-popover',
				enableBackdropDismiss: true
			});
		this.popover.present();
	}
}

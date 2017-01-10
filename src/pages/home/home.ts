import { Component, OnInit } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { TransactionService } from '../../services/TransactionService';
import { AlertService } from '../../services/AlertService';
import { Transaction } from '../../domain/Transaction';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	private username: string;
	private transactions: Array<Transaction>;

	constructor(private menuCtrl: MenuController,
		private authService: AuthService,
		private transactionService: TransactionService,
		private alertService: AlertService) {
		this.menuCtrl.enable(true, 'app-menu');
		this.authService.getUserInfo.subscribe(
			userInfo => {
				this.username = userInfo.name;
			});
		this.authService.loadToken();
	}

	ngOnInit(): void {
		this.transactionService.list()
			.subscribe(
			response => this.transactions = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	stateIcons = {
		'done': 'checkmark-circle',
		'pending': 'ios-time'
	}
}

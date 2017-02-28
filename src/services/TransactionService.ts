import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Transaction } from '../domain/Transaction';
import * as lodash from 'lodash';

@Injectable()
export class TransactionService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Transaction>> {
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.transactions}?depth=1`)
			.map((response: Array<Transaction>) => {
				response = lodash.map(response, (transaction: Transaction, key: any) => {
					if (!transaction.id) {
						transaction.id = key;
					}
					return transaction;
				});
				return response;
			});
	}

	get(id): Observable<Transaction> {
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.transactions}/${id}?depth=1`);
	}

	post(transaction: Transaction): Observable<Transaction> {
		return this.httpBasicAuth.postWithAuth(this.settings.URL.transactions, transaction);
	}

	describe(): Observable<any> {
		return this.httpBasicAuth.options(this.settings.URL.transactions)
			.map(response => {
				return response;
			});
	}
}
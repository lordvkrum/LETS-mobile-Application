import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Transaction } from '../domain/Transaction';
import { map } from 'lodash';

@Injectable()
export class TransactionService {
	private pageSize: number = 20;

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(page, filter = ''): Observable<Array<Transaction>> {
		let offset = this.pageSize * (page - 1);
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.transactions}?depth=2&offset=${offset}&limit=${this.pageSize}${filter}`)
			.map((response: Array<Transaction>) => {
				response = map(response, (transaction: Transaction, key: any) => {
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
		return this.httpBasicAuth.options(this.settings.URL.transactions);
	}
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Want } from '../domain/Want';
import { OPTIONS_OFFER } from '../test/mock-options-offer';
import { OFFERS } from '../test/mock-offers';
import * as lodash from 'lodash';

@Injectable()
export class WantService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Want>> {
		return this.httpBasicAuth.get(this.settings.URL.config)
		// return this.httpBasicAuth.getWithAuth(`${this.settings.URL.wants}?depth=1`)
			.map((response: Array<Want>) => {
				response = <any>OFFERS;
				response = lodash.map(response, (want: Want, key: any) => {
					if (!want.id) {
						want.id = key;
					}
					return want;
				});
				return response;
			});
	}

	get(id): Observable<Want> {
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.wants}/${id}?depth=1`);
	}

	post(want: Want): Observable<Want> {
		return this.httpBasicAuth.postWithAuth(this.settings.URL.wants, want);
	}

	describe(): Observable<any> {
		return this.httpBasicAuth.get(this.settings.URL.config)
		// return this.httpBasicAuth.options(this.settings.URL.wants)
			.map(response => {
				response = OPTIONS_OFFER;
				return response;
			});
	}
}
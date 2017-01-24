import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Want } from '../domain/Want';
import * as lodash from 'lodash';

@Injectable()
export class WantService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Want>> {
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.wants}?depth=1`)
		.map((response: Array<Want>) => {
			response = lodash.map(response, (want: Want) => {
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
		return this.httpBasicAuth.options(this.settings.URL.wants);
	}
}
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppSettings } from '../app/app.settings';
import { map } from 'lodash';

@Injectable()
export class HttpBasicAuth {
	private authorizationToken: string;
	private AUTH_TOKEN_KEY: string;

	constructor(private http: Http,
		private settings: AppSettings) {
		this.AUTH_TOKEN_KEY = 'auth_token';
		this.loadToken();
	}

	loadToken() {
		var token = window.localStorage.getItem(this.AUTH_TOKEN_KEY);
		if (!token) {
			token = window.sessionStorage.getItem(this.AUTH_TOKEN_KEY);
		}
		if (token) {
			this.setToken(JSON.parse(token));
		}
	}

	private storeToken(token, rememberMe) {
		if (rememberMe) {
			window.localStorage.setItem(this.AUTH_TOKEN_KEY, JSON.stringify(token));
		} else {
			window.sessionStorage.setItem(this.AUTH_TOKEN_KEY, JSON.stringify(token));
		}
		this.setToken(token);
	}

	private destroyToken() {
		window.localStorage.removeItem(this.AUTH_TOKEN_KEY);
		window.sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
	}

	private setToken(token) {
		this.authorizationToken = token;
	}

	setAuthorizationToken(username, password, rememberMe) {
		this.authorizationToken = `Basic ${btoa(`${username}:${password}`)}`;
		this.storeToken(this.authorizationToken, rememberMe);
	}

	private createAuthorizationHeader(headers: Headers) {
		headers.append('Authorization', this.authorizationToken);
	}

	private createAcceptHeader(headers: Headers) {
		headers.append('Accept', 'application/json');
	}

	private extractData(response: Response) {
		let body = response.json();
		return body || {};
	}

	private extractError(error): any {
		throw error._body;
	}

	getWithAuth(url) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.get(url, headers);
	}

	get(url, headers: any = new Headers()) {
		this.createAcceptHeader(headers);
		return this.http.get(url, {
			headers: headers
		}).map(this.extractData)
			.catch(this.extractError);
	}

	getAutocomplete(resource, autocomplete, fragment) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.get(`${this.settings.SERVER_URL}/${resource}?${autocomplete}${fragment}&limit=3`, headers)
			.map((response: any) => {
				response = map(response, (item: any, key: any) => {
					let newItem;
					if (typeof item !== 'object') {
						newItem = {
							value: item
						};
					} else {
						newItem = item;
					}
					if (!newItem.id) {
						newItem.id = key;
					}
					return newItem;
				});
				return response;
			});
	}

	postWithAuth(url, data) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.post(url, data, headers);
	}

	post(url, data, headers: any = new Headers()) {
		this.createAcceptHeader(headers);
		return this.http.post(url, data, {
			headers: headers
		}).map(this.extractData)
			.catch(this.extractError);
	}

	patchWithAuth(url, data) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.patch(url, data, headers);
	}

	patch(url, data, headers: any = new Headers()) {
		this.createAcceptHeader(headers);
		return this.http.patch(url, data, {
			headers: headers
		}).map(this.extractData)
			.catch(this.extractError);
	}

	options(url) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		this.createAcceptHeader(headers);
		return this.http.options(url, {
			headers: headers
		}).map(this.extractData)
			.catch(this.extractError);
	}

	logout() {
		this.destroyToken();
	}
}
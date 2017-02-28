import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppSettings } from '../app/app.settings';

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
		if (token) {
			this.setToken(JSON.parse(token));
		}
	}

	private storeToken(token) {
		window.localStorage.setItem(this.AUTH_TOKEN_KEY, JSON.stringify(token));
		this.setToken(token);
	}

	private destroyToken() {
		window.localStorage.removeItem(this.AUTH_TOKEN_KEY);
	}

	private setToken(token) {
		this.authorizationToken = token;
	}

	setAuthorizationToken(username, password) {
		this.authorizationToken = `Basic ${btoa(`${username}:${password}`)}`;
		this.storeToken(this.authorizationToken);
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

	getAutocomplete(autocompleteURL?, fragment?) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.get(`${this.settings.SERVER_URL}${autocompleteURL || ''}${fragment || ''}`, headers);
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
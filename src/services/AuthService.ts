import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Member } from '../domain/Member';
import { MEMBER } from '../test/mock-member';

@Injectable()
export class AuthService {
	private LOCAL_TOKEN_KEY: string;
	private hasToken: boolean;
	private userInfo = new Subject<Member>();
	getUserInfo = this.userInfo.asObservable();

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) {
		this.LOCAL_TOKEN_KEY = 'auth_token';
		this.hasToken = false;
	}

	loadToken() {
		var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
		if (token) {
			this.setToken(JSON.parse(token));
		}
	}

	private storeToken(token) {
		window.localStorage.setItem(this.LOCAL_TOKEN_KEY, JSON.stringify(token));
		this.setToken(token);
	}

	private destroyToken() {
		this.hasToken = false;
		window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
	}

	private setToken(token) {
		this.hasToken = true;
		this.userInfo.next(token);
	}

	isAuthenticated() {
		return this.hasToken;
	}

	private requestUserInfo(username): Observable<Member> {
		// return this.httpBasicAuth
		// .getWithAuth(`${this.settings.URL.members}?fragment=${username}&depth=1`)
		return this.httpBasicAuth.get(this.settings.URL.config)
			.map(response => {
				response = MEMBER;
				this.storeToken(response);
				return response;
			});
	}

	login(username, password): Observable<Member> {
		this.httpBasicAuth.setAuthorizationToken(username, password);
		return this.requestUserInfo(username);
	}

	logout() {
		return Observable.create(observer => {
			this.destroyToken();
			observer.next('');
			observer.complete();
		});
	}
}
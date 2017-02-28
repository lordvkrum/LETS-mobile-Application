import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Member } from '../domain/Member';
import * as lodash from 'lodash';

@Injectable()
export class MemberService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Member>> {
		return this.httpBasicAuth.getWithAuth(this.settings.URL.members)
			.map((response: Array<Member>) => {
				response = lodash.map(response, (member: Member, key: any) => {
					if (!member.id) {
						member.id = key;
					}
					return member;
				});
				return response;
			});
	}

	get(id): Observable<Member> {
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.members}/${id}?depth=1`);
	}

	post(member: Member): Observable<any> {
		return this.httpBasicAuth.postWithAuth(this.settings.URL.members, member);
	}

	patch(member: Member): Observable<any> {
		return this.httpBasicAuth.patchWithAuth(`${this.settings.URL.members}/${member.id}`, member);
	}

	describe(): Observable<any> {
		return this.httpBasicAuth.options(this.settings.URL.members);
	}
}
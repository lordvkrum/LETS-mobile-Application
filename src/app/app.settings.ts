import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
	public get SERVER_URL(): any {
		return 'http://hamlets.communityforge.net/commex';
	}
	
	public get URL(): any {
		return {
			sessionToken: `${this.SERVER_URL}/rest/session/token`,
			login: `${this.SERVER_URL}/user/login`,
			logout: `${this.SERVER_URL}/user/logout`,
			userInfo: `${this.SERVER_URL}/v1/member`,
			config: `${this.SERVER_URL}`,
			transactions: `${this.SERVER_URL}/v1/transaction`,
			offers: `${this.SERVER_URL}/v1/offer`,
			wants: `${this.SERVER_URL}/v1/want`
			members: '${this.SERVER_URL}/member'
		};
	}

}
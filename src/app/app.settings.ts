import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {

	public get USER_ROLES(): any {
		return {
			member: 'member_role'
		};
	}

	public get AUTH_EVENTS(): any {
		return {
			notAuthenticated: 'auth-not-authenticated',
			notAuthorized: 'auth-not-authorized'
		};
	}

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
			members: '${this.SERVER_URL}/member'
		};
	}

}
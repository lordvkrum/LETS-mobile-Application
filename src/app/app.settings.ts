import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
	public get WEB_SITE_URL(): any {
		return 'http://hamlets.communityforge.net';
	}
	public get SERVER_URL(): any {
		return 'http://hamlets.communityforge.net/commex';
	}
	public get URL(): any {
		return {
			config: `${this.SERVER_URL}`,
			transactions: `${this.SERVER_URL}/transaction`,
			offers: `${this.SERVER_URL}/offer`,
			wants: `${this.SERVER_URL}/want`,
			members: `${this.SERVER_URL}/member`,
			contact: `${this.SERVER_URL}/contact`
		};
	}

}
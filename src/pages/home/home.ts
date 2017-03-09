import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, Popover } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { Member } from '../../domain/Member';
import { LoginPage } from '../../pages/login/login';
import { OffersPage } from '../../pages/offers/offers';
import { AddOfferPage } from '../../pages/addOffer/addOffer';
import { WantsPage } from '../../pages/wants/wants';
import { AddWantPage } from '../../pages/addWant/addWant';
import { MembersPage } from '../../pages/members/members';
import { ProfilePage } from '../../pages/userProfile/userProfile';
import { MenuOptionPopover } from './menu-option';

interface MenuEntry {
	title: string;
	icon: string;
	options?: Array<{ title: string, page?: any }>;
	page?: any;
}

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	private member: Member;
	private menu: Array<MenuEntry>;
	private popover: Popover;

	constructor(private navCtrl: NavController,
		private popoverCtrl: PopoverController,
		private authService: AuthService) {
		this.menu = [{
			title: 'Record a Transaction',
			icon: 'ion-edit',
			options: [{
				title: 'as Seller',
				page: OffersPage
			}, {
				title: 'as Buyer',
				page: OffersPage
			}]
		}, {
			title: 'Trading Records',
			icon: 'ion-stats-bars',
			page: OffersPage
		}, {
			title: 'Offerings',
			icon: 'ion-pricetag',
			options: [{
				title: 'View',
				page: OffersPage
			}, {
				title: 'Create',
				page: AddOfferPage
			}]
		}, {
			title: 'Wants',
			icon: 'ion-pin',
			options: [{
				title: 'View',
				page: WantsPage
			}, {
				title: 'Create',
				page: AddWantPage
			}]
		}, {
			title: 'Announcements',
			icon: 'ion-alert',
			page: OffersPage
		}, {
			title: 'Users',
			icon: 'ion-person',
			page: MembersPage
		}, {
			title: 'My Account',
			icon: 'ion-home',
			page: ProfilePage
		}, {
			title: 'Stats',
			icon: 'ion-pie-graph',
			page: OffersPage
		}];
	}

	ngOnInit(): void {
		this.authService.userInfo.subscribe(
			userInfo => {
				this.member = userInfo;
			});
	}

	goToPage(menuEntry) {
		let page = menuEntry.page;
		if (page) {
			this.navCtrl.push(page);
			if (this.popover) {
				this.popover.dismiss();
			}
		}
	}

	showOptions(menuEntry, $event) {
		if (menuEntry.options && menuEntry.options.length) {
			this.popover = this.popoverCtrl.create(MenuOptionPopover, {
				options: menuEntry.options
			});
			this.popover.present({
				ev: $event
			});
		}
	}

	doLogout() {
		this.authService.doLogout().subscribe(
			response => this.navCtrl.setRoot(LoginPage));
	}
}

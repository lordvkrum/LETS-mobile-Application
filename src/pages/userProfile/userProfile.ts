import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { Member } from '../../domain/Member';

@Component({
	selector: 'page-userProfile',
	templateUrl: 'userProfile.html'
})
export class ProfilePage implements OnInit {
	private user: Member;

	constructor(public viewCtrl: ViewController,
		private authService: AuthService,
		private memberService: MemberService,
		private alertService: AlertService,
		private navParams: NavParams
	) { }

	ngOnInit(): void {
		this.authService.userInfo.subscribe( response => 
			this.user = response
		);
	}

	openEditModal() : void {
		
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	

}

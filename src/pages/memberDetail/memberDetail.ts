import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { Member } from '../../domain/Member';

@Component({
	selector: 'page-memberDetail',
	templateUrl: 'memberDetail.html'
})
export class MemberDetailModal implements OnInit {
	private member: Member;

	constructor(public viewCtrl: ViewController,
		private authService: AuthService,
		private memberService: MemberService,
		private alertService: AlertService,
		private navParams: NavParams
	) { }

	ngOnInit(): void {
		this.memberService.get(this.navParams.get('memberId'))
			.subscribe(
			response => this.member = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}

import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { Member } from '../../domain/Member';

@Component({
	selector: 'page-userProfileEdit',
	templateUrl: 'userProfileEdit.html'
})
export class ProfileEditPage implements OnInit {
	private definitionMember: any;
	private fields: Array<any>;
	private user: Member;

	constructor(public viewCtrl: ViewController,
		private authService: AuthService,
		private memberService: MemberService,
		private alertService: AlertService,
		private navParams: NavParams
	) { }

	ngOnInit(): void {
	/*	this.memberService.descripe()
		.subscribe(
			response => {
				this.definitionMember = response;
				this.fields = this.definitionMember.PATCH;
			},
			error => this.alertService.showError(error)
			); */
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}

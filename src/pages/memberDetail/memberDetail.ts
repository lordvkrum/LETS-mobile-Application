import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
		private authService: AuthService,
		private memberService: MemberService,
		private alertService: AlertService,
		private navParams: NavParams
		) {
		this.member = this.memberService.getMemberWithId(  navParams.get('memberId') );
  }
 
  ngOnInit(): void { }

}

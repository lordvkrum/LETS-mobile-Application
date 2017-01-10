import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { MemberService } from '../../services/MemberService';
import { AlertService } from '../../services/AlertService';
import { Member } from '../../domain/Member';
import { MemberDetailModal } from '../memberDetail/memberDetail';

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage implements OnInit {
	private username: string;
	private members: Array<Member>;

  constructor(public navCtrl: NavController,
		private menuCtrl: MenuController,
		private modalCtrl: ModalController,
		private authService: AuthService,
		private memberService: MemberService,
		private alertService: AlertService) {
		this.authService.getUserInfo.subscribe(
			userInfo => {
				this.username = userInfo.name;
			});
		this.authService.loadToken();
  }

  ngOnInit(): void {
		this.memberService.list()
		.subscribe(
			result => this.members = result,
			error => this.alertService.showError('Connection problem!')
			);
	}

	presentDetailModal(id){
		let modal = this.modalCtrl.create(MemberDetailModal, { memberId: id});
		modal.present();
	}
}

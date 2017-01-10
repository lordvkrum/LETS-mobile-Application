import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {

	constructor(private toastCtrl: ToastController,
		private alertCtrl: AlertController) { }

	showError(message) {
		console.error(message);
		return this.alertCtrl.create({
			title: 'Error!',
			subTitle: message,
			buttons: ['OK']
		}).present();
		// return this.toastCtrl.create({
		// 	message: message,
		// 	duration: 3000
		// }).present();
	}
}
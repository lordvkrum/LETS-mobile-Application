import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { Offer } from '../../domain/Offer';

@Component({
	selector: 'page-add-offer',
	templateUrl: 'addOffer.html'
})
export class AddOfferPage implements OnInit {
	offerForm: FormGroup;
	private definition_offer: any;
	private offer: Offer;

	constructor(private viewCtrl: ViewController,
		private formBuilder: FormBuilder,
		private offerService: OfferService,
		private alertService: AlertService) { }

	login() {
		// this.username = this.offerForm.value.username;
		// this.password = this.offerForm.value.password;
		// this.buildForm();
		// this.authService.create(this.username, this.password)
		// 	.subscribe(
		// 	response => this.navCtrl.setRoot(HomePage),
		// 	error => this.alertService.showError('Connection problem!')
		// 	);
	}

	ngOnInit(): void {
		this.offerService.describe()
			.subscribe(
			response => {
				this.definition_offer = response;
				this.buildForm();
			},
			error => this.alertService.showError('Connection problem!')
			);
	}

	buildForm(): void {
		console.log('defin', this.definition_offer);
		this.offerForm = this.formBuilder.group({
			// 'username': [this.username, Validators.required],
			// 'password': [this.password, Validators.required]
		});
		this.offerForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data?: any) {
		if (!this.offerForm) { return; }
		const form = this.offerForm;
		for (const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	formErrors = {};

	validationMessages = {};
}

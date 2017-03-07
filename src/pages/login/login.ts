import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewController, NavController } from 'ionic-angular';
import { AppSettings } from '../../app/app.settings';
import { AuthService } from '../../services/AuthService';
import { AlertService } from '../../services/AlertService';
import { HomePage } from '../home/home';
import * as $ from 'jquery';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
	loginForm: FormGroup;
	private username: string;
	private password: string;
	private rememberMe: boolean;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		private formBuilder: FormBuilder,
		private settings: AppSettings,
		private authService: AuthService,
		private alertService: AlertService) {
		viewCtrl.didEnter.subscribe(
			response => {
				setTimeout(() => {
					$('div.page-login').height($('page-login').height());
				}, 0);
			});
	}

	doLogin() {
		this.username = this.loginForm.value.username;
		this.password = this.loginForm.value.password;
		this.rememberMe = this.loginForm.value.rememberMe;
		this.authService.doLogin(this.username, this.password, this.rememberMe)
			.subscribe(
			response => this.navCtrl.setRoot(HomePage),
			error => this.alertService.showError('Error with credentials. Please try again.\n' + error)
			);
	}

	goToFullSite() {
		window.open(this.settings.WEB_SITE_URL, '_system', 'location=yes');
	}

	ngOnInit(): void {
		this.buildForm();
	}

	buildForm(): void {
		this.loginForm = this.formBuilder.group({
			'username': [this.username, Validators.required],
			'password': [this.password, Validators.required],
			'rememberMe': [this.rememberMe],
		});
		this.loginForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data?: any) {
		if (!this.loginForm) { return; }
		const form = this.loginForm;
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

	formErrors = {
		'username': '',
		'password': ''
	};

	validationMessages = {
		'username': {
			'required': 'Email is required.'
		},
		'password': {
			'required': 'Password is required.'
		}
	};
}

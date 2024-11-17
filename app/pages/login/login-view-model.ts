import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class LoginViewModel extends Observable {
    constructor() {
        super();
        this.set('email', '');
        this.set('password', '');
        this.set('errorMessage', '');
    }

    async onLogin() {
        try {
            if (!this.get('email') || !this.get('password')) {
                this.set('errorMessage', 'Email and password are required');
                return;
            }

            this.set('errorMessage', ''); // Clear previous errors
            console.log('Starting login process...');
            const user = await AuthService.signIn(this.get('email'), this.get('password'));
            console.log('Login successful, navigating...');
            Frame.topmost().navigate({
                moduleName: 'pages/records/records-page',
                clearHistory: true
            });
        } catch (error) {
            console.error('Login error details:', {
                code: error.code,
                message: error.message,
                stack: error.stack
            });
            this.set('errorMessage', `Error: ${error.message}`);
        }
    }

    async onSignUp() {
        try {
            if (!this.get('email') || !this.get('password')) {
                this.set('errorMessage', 'Email and password are required');
                return;
            }

            this.set('errorMessage', ''); // Clear previous errors
            console.log('Starting signup process...');
            const user = await AuthService.signUp(this.get('email'), this.get('password'));
            console.log('Signup successful, navigating...');
            Frame.topmost().navigate({
                moduleName: 'pages/records/records-page',
                clearHistory: true
            });
        } catch (error) {
            console.error('Signup error details:', {
                code: error.code,
                message: error.message,
                stack: error.stack
            });
            this.set('errorMessage', `Error: ${error.message}`);
        }
    }
}
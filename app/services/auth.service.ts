import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';

export class AuthService {
  static async signIn(email: string, password: string): Promise<any> {
    try {
      console.log('Attempting sign in with:', email);
      const userCredential = await firebase().auth().signInWithEmailAndPassword(email, password);
      console.log('Sign in successful:', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Sign in error:', error.code, error.message);
      throw error;
    }
  }

  static async signUp(email: string, password: string): Promise<any> {
    try {
      console.log('Attempting sign up with:', email);
      const userCredential = await firebase().auth().createUserWithEmailAndPassword(email, password);
      console.log('Sign up successful:', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Sign up error:', error.code, error.message);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      await firebase().auth().signOut();
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error.code, error.message);
      throw error;
    }
  }

  static getCurrentUser() {
    return firebase().auth().currentUser;
  }
}
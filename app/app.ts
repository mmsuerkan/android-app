import { firebase } from '@nativescript/firebase-core';
import { Application } from '@nativescript/core';

// Initialize Firebase with debug mode
firebase()
  .initializeApp()
  .then(() => {
    if (global.__DEV__) {
      console.log("Firebase Debug Mode: ON");
      firebase().auth().useEmulator('http://localhost:9099');
      firebase().database().useEmulator('localhost', 9000);
    }
    console.log("Firebase initialized successfully");
    Application.run({ moduleName: 'app-root' });
  })
  .catch(error => {
    console.error("Firebase initialization error:", error.code, error.message);
    Application.run({ moduleName: 'app-root' });
  });
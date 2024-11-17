import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';
import { Observable } from '@nativescript/core';

export class DatabaseService {
  static getRecordsRef() {
    return firebase().database().ref('records');
  }

  static async createRecord(data: any): Promise<string> {
    try {
      const newRef = this.getRecordsRef().push();
      await newRef.set({
        ...data,
        userId: AuthService.getCurrentUser().uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      return newRef.key;
    } catch (error) {
      throw error;
    }
  }

  static async updateRecord(id: string, data: any): Promise<void> {
    try {
      await this.getRecordsRef().child(id).update(data);
    } catch (error) {
      throw error;
    }
  }

  static observeRecords(): Observable {
    const records = new Observable();
    
    this.getRecordsRef()
      .orderByChild('userId')
      .equalTo(AuthService.getCurrentUser().uid)
      .on('value', (snapshot) => {
        const items = [];
        snapshot.forEach((child) => {
          items.push({
            id: child.key,
            ...child.val()
          });
        });
        records.notify({
          eventName: 'recordsUpdated',
          object: records,
          data: items
        });
      });

    return records;
  }
}
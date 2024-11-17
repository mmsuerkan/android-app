import { Observable, Frame } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

export class RecordsViewModel extends Observable {
  records: any[] = [];
  private recordsObservable: Observable;

  constructor() {
    super();
    this.initializeRecordsListener();
  }

  private initializeRecordsListener() {
    this.recordsObservable = DatabaseService.observeRecords();
    this.recordsObservable.on('recordsUpdated', (data) => {
      this.set('records', data.data);
    });
  }

  onAddRecord() {
    Frame.topmost().navigate('pages/record-form/record-form-page');
  }

  onItemTap(args) {
    const record = this.records[args.index];
    Frame.topmost().navigate({
      moduleName: 'pages/record-form/record-form-page',
      context: { record }
    });
  }

  async onLogout() {
    try {
      await AuthService.signOut();
      Frame.topmost().navigate({
        moduleName: 'pages/login/login-page',
        clearHistory: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
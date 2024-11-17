import { Observable, Frame } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';

export class RecordFormViewModel extends Observable {
  id: string = '';
  title: string = '';
  description: string = '';
  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(record?: any) {
    super();
    if (record) {
      this.id = record.id;
      this.title = record.title;
      this.description = record.description;
      this.isEditing = true;
    }
  }

  async onSave() {
    try {
      if (!this.title.trim()) {
        throw new Error('Title is required');
      }

      const data = {
        title: this.title,
        description: this.description
      };

      if (this.isEditing) {
        await DatabaseService.updateRecord(this.id, data);
      } else {
        await DatabaseService.createRecord(data);
      }

      Frame.topmost().goBack();
    } catch (error) {
      this.set('errorMessage', error.message);
    }
  }
}
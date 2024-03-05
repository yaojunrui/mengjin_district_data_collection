import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { People } from '../../../type';
import { DataService } from '../../../services/data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-person-extension-dialog',
  standalone: true,
  imports: [MatRadioModule, FormsModule],
  templateUrl: './person-extension-dialog.component.html',
  styleUrl: './person-extension-dialog.component.css'
})
export class PersonExtensionDialogComponent {
  data: People = {}
  is_host: string = "1"
  is_huji: string = "1"

  constructor(private dataservice: DataService, private dialog: MatDialogRef<any>) { }

  onSubmit() {
    this.dataservice.getPeopleExtension({ "is_host": this.is_host, "is_huji": this.is_huji })
    this.dialog.close()
  }
}

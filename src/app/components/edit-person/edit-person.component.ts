import { Component, Inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { People, TableName } from '../../type';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import copy from 'fast-copy';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-person.component.html',
  styleUrl: './edit-person.component.css'
})
export class EditPersonComponent {

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialogRef<EditPersonComponent>,
    private dbservice: DbService) {
    this.oldData = copy(data)
    this.person = data
    this.is_host = data.is_host == 1
    this.is_resident = data.is_resident == 1
  }

  person: People = {}
  oldData: People = {}

  is_host: boolean = true
  is_resident: boolean = false
  onSubmit() {
    if (this.isPersonChange()) {
      this.dbservice.update(TableName.people, { tel: this.person.tel, name: this.person.name }, this.person.id).subscribe(res => {
        console.log("更新成功")
      })
    }

    if (this.isPersonBuildingChange()) {
      this.dbservice.update(TableName.people_building, { is_host: this.is_host ? 1 : 0, is_resident: this.is_resident ? 1 : 0 }, this.person.pb_id).subscribe(res => {
        if (res > 0) {
          console.log("更新人员信息成功")
          this.person.is_host = this.is_host ? 1 : 0
          this.person.is_resident = this.is_resident ? 1 : 0
        }

      })
    }

    this.dialog.close()
  }

  private isPersonChange() {
    if (this.person.tel != this.oldData.tel || this.person.name != this.oldData.name) {
      return true;
    }
    return false;
  }

  private isPersonBuildingChange() {
    if (this.is_host != (this.oldData.is_host == 1) || this.is_resident != (this.oldData.is_resident == 1)) {
      return true;
    }
    return false;
  }
}

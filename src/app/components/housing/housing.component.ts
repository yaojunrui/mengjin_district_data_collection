import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { Housing, TableName } from '../../type';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-housing',
  standalone: true,
  imports: [MatFormFieldModule, MatAutocompleteModule, FormsModule, MatButtonModule, MatInputModule,
    MatDialogModule, CommonModule,],
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.css'
})
export class HousingComponent {
  data: Housing = {}

  constructor(private dbservice: DbService, private dialogref: MatDialogRef<HousingComponent>,
    private dataservice: DataService, @Inject(MAT_DIALOG_DATA) data: Housing) {
    if (data) {
      this.data = data
    }
  }

  policeStations = [
    '城关派出所',
    '吉利派出所',
    '河阳派出所',
    '会盟派出所',
    '横水派出所',
    '常袋派出所',
    '朝阳派出所',
    '平乐派出所',
    '送庄派出所',
    '白鹤派出所',
    '麻屯派出所',
    '小浪底派出所'
  ]

  onSubmit() {
    if (this.validate()) {
      if (!this.data.id) {
        this.dbservice.insert(TableName.housing, this.data).subscribe(res => {
          console.log(res)
          if (res > 0) {
            this.dialogref.close()
            this.data.id = res
            this.dataservice.addHousing(this.data)
          }

        })
      }
      else {
        this.dbservice.update(TableName.housing, this.data, this.data.id).subscribe(res => {
          if (res > 0) {
            this.dialogref.close()
            this.dataservice.editHousing(this.data)
          }
        })
      }
    }

  }

  validate() {
    if (this.data.housing_name == "") {
      return false
    }
    return true
  }



}

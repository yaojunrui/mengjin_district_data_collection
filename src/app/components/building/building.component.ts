import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Building, TableName } from '../../type';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db.service';
import { DataService } from '../../services/data.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-building',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, FormsModule, MatCheckboxModule, MatInputModule,
    CommonModule, MatDialogModule],
  templateUrl: './building.component.html',
  styleUrl: './building.component.css'
})
export class BuildingComponent {

  data: Building = {}
  isNormal: boolean = true
  unitArray: string
  countUnit: number
  countHome: number

  constructor(private dbservice: DbService, private dataservice: DataService,
    private matdialogref: MatDialogRef<BuildingComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    if (data.id) {
      this.data = data
      if (this.isAllElementsEqual(this.data.unit_home)) {
        this.countUnit = this.data.unit_home.length
        this.countHome = this.data.unit_home[0]
        this.isNormal = true
      }
      else {
        this.unitArray = this.data.unit_home.join(" ")
        this.isNormal = false
      }
    }
    else {
      this.data.housing_id = data
    }



  }

  onChange(event) {
    this.isNormal = !this.isNormal
  }

  onSubmit() {
    this.data.unit_home = this.getUnitData()
    if (this.validate()) {

      this.dbservice.insert(TableName.building, this.data).subscribe(res => {
        this.data.id = res
        console.log(this.data.id)
        this.dataservice.addBuilding(this.data)
        this.matdialogref.close()
      }
      )
    }
    else {
      this.dbservice.update(TableName.building, this.data, this.data.id).subscribe(res => {
        this.dataservice.editBuilding(this.data)
        this.matdialogref.close()
      })
    }

  }

  getUnitData() {
    if (this.isNormal) {
      return JSON.stringify(Array(this.countUnit).fill(this.countHome))
    }

    else {
      return JSON.stringify(this.unitArray.split(" "))
    }
  }

  validate() {
    if (this.data.building_number == "") {
      return false
    }
    return true
  }

  private isAllElementsEqual(array) {
    return array.every((element, index, arr) => element === arr[0]);
  }
}

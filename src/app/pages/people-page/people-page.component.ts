import { Component } from '@angular/core';
import { SelectPeopleComponent } from "../../components/select-people/select-people.component";
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { GlobalVar, User } from '../../user';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db.service';
import { People, People_building, Room_status, TableName } from '../../type';
import { RoomPersonItemComponent } from "./room-person-item/room-person-item.component";
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonExtensionDialogComponent } from './person-extension-dialog/person-extension-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-people-page',
  standalone: true,
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.css',
  imports: [SelectPeopleComponent, FormsModule, MatRadioModule, CommonModule, RoomPersonItemComponent]
})
export class PeoplePageComponent {

  constructor(private route: ActivatedRoute, private dbservice: DbService, private dataservice: DataService,
    private router: Router, private dialog: MatDialog) {
    if (!GlobalVar.current_building || !GlobalVar.current_housing) {
      this.router.navigate(['/housing'])
    }
    else {
      this.buildingName = GlobalVar?.current_building.building_number + "号楼"
      this.hosingName = GlobalVar?.current_housing.housing_name
    }

    this.room_number = route.snapshot.queryParams["roomNumber"]
    this.buildingId = route.snapshot.queryParams["buildingId"]

    if (!User.id) {
      this.router.navigate(['login'])
    }


  }

  ngOnInit() {
    this.refreshPeople()

    this.dataservice.deletePerson$.subscribe(res => {
      const index = this.persons.findIndex(v => v.id = res.id)
      this.dbservice.delete({ tableName: TableName.people_building, id: res.pb_id }).subscribe(res => {
        // this.persons.splice(index, 1)//从视图上删除
        this.getRoomPeople().subscribe(res => {
          this.persons = res
          this.updateRoomStatus().subscribe()
        })
      })
    })


  }

  residence_types = [
    '自住', '租住', '经商', '其他',
  ]

  buildingName: string
  room_number: string
  hosingName: string
  residence_type = "自住"
  buildingId: number
  persons: People[] = []

  onChange() {
    return this.updateRoomStatus().subscribe(res => {
      console.log(res, "onChange")
    })
  }
  onBack() {
    this.router.navigate(['building'], { queryParams: GlobalVar.current_building })
  }

  onSelectPeople(p) {

    this.dialog.open(PersonExtensionDialogComponent, { data: p })

    this.dataservice.getPeopleExtension$.pipe(take(1)).subscribe(res => {
      let data: People_building = {
        building_id: this.buildingId,
        people_id: p.id,
        room_number: this.room_number
        //is_host: 1, //是房主
        //is_resident: 1 //是居民
      }
      data.is_host = res.is_host
      data.is_resident = res.is_huji

      this.dbservice.insert(TableName.people_building, data).subscribe(res => {
        data.id = res
        this.getRoomPeople().subscribe(res => {
          this.persons = res
          this.updateRoomStatus().subscribe(res => {
            console.log(res)
          })
        })
      })
    })

  }

  refreshPeople() {
    this.getRoomPeople().subscribe(res => {
      this.persons = res
    })

    this.getRoomStatus().subscribe(res => {
      console.log(res, "getRoomStatus")
      this.residence_type = res[0]?.type
    })
  }

  private getRoomPeople() {
    return this.dbservice.getRoomPeople(this.buildingId, this.room_number)
  }

  getRoomStatus() {
    return this.dbservice.getRoomStatus(this.buildingId, this.room_number)
  }

  private updateRoomStatus() {
    const data: Room_status = {
      room_number: this.room_number,
      building_id: this.buildingId,
      result: 1, //更新成功
      result_message: this.persons.length + "人",
      type: this.residence_type
    }


    return this.dbservice.updateRoomStatus(data)
  }


}

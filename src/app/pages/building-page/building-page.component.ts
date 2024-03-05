import { Component } from '@angular/core';
import { Building, Housing, Room_status } from '../../type';
import { CommonModule, Location } from '@angular/common';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { GlobalVar, User } from '../../user';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-building-page',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule],
  templateUrl: './building-page.component.html',
  styleUrl: './building-page.component.css'
})
export class BuildingPageComponent {
  housing: Housing = {}
  building: Building = {}
  unitRoomNumbers: any[]
  allRoomStatus: Room_status[] = []

  constructor(private route: ActivatedRoute, private router: Router, private dbservice: DbService,
    private location: Location) {
    // this.building = GlobalVar.current_building
    this.building = this.route.snapshot.queryParams
    // console.log(this.building)
    // console.log("asssssssssss")

    if (!User.id) {
      this.router.navigate(['login'])
    }
  }
  ngOnInit() {
    this.getAllRoomStatus().subscribe(res => {
      this.allRoomStatus = res
    })
  }

  onClickRoom(item) {
    console.log(item)

    this.router.navigate(['people'], { queryParams: { buildingId: this.building.id, roomNumber: item.room_number } })
  }
  getBgColor(item) {
    if (item.result == 1) {
      return "green"
    }
    return "white"
  }
  onClickUnit(i) {
    this.unitRoomNumbers = this.createUnitArray(i)
    console.log(this.unitRoomNumbers)
  }
  onScroll(event) {

  }
  onEditBuilding() { }
  onBack() {
    this.location.back()
  }

  private getAllRoomStatus() {
    return this.dbservice.getAllRoomStatus(this.building.id)
  }

  private createUnitArray(unit) {
    const countHome = this.building.unit_home[unit];
    let arr = [];
    for (let i = 0; i < this.building.floor; i++) {
      for (let j = 0; j < countHome; j++) {
        let roomNumber;
        if (j < 9) {
          roomNumber = `${unit + 1}-${i + 1}0${j + 1}`;
        } else {
          roomNumber = `${unit + 1}-${i + 1}${j + 1}`;
        }
        let a: any = {};
        a.room_number = roomNumber;

        for (let k = 0; k < this.allRoomStatus.length; k++) {
          const b = this.allRoomStatus[k];
          if (b.room_number == roomNumber) {
            a.result = b.result
            a.result_message = b.result_message
          }
        }
        arr.push(a)
      }
    }
    return arr

  }
}

import { Component } from '@angular/core';
import { Building, Housing } from '../../type';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { GlobalVar } from '../../user';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-building-page',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './building-page.component.html',
  styleUrl: './building-page.component.css'
})
export class BuildingPageComponent {
  housing: Housing = {}
  building: Building = {}
  unitRoomNumbers: any[]

  constructor(private route: ActivatedRoute, private router: Router) {
    // this.building = GlobalVar.current_building
    this.building = this.route.snapshot.queryParams
    // console.log(this.building)
    // console.log("asssssssssss")
  }

  onClickRoom(item) {
    console.log(item)

    this.router.navigate(['people'], { queryParams: { buildingId: this.building.id, roomNumber: item.room_number } })
  }
  getBgColor(item) { }
  onClickUnit(i) {
    this.unitRoomNumbers = this.createUnitArray(i)
    console.log(this.unitRoomNumbers)
  }
  onScroll(event) { }
  onEditBuilding() { }
  onBack() { }

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

        // for (let k = 0; k < this.buildingInfos.length; k++) {
        //   const b = this.buildingInfos[k];
        //   if (b.room_number == roomNumber) {
        //     a.result = b.result
        //     a.result_message = b.result_message
        //   }
        // }
        arr.push(a)
      }
    }
    return arr

  }
}

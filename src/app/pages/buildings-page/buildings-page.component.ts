import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Building, Housing } from '../../type';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BuildingComponent } from '../../components/building/building.component';
import { DataService } from '../../services/data.service';
import { DbService } from '../../services/db.service';
import { Location } from '@angular/common';
import { GlobalVar, User } from '../../user';
import { LongPressDirective } from '../../longpress';


@Component({
  selector: 'app-building-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, LongPressDirective],
  templateUrl: './buildings-page.component.html',
  styleUrl: './buildings-page.component.css'
})
export class BuildingsPageComponent {

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private dataservice: DataService,
    private dbservice: DbService, private location: Location, private router: Router) {
    this.housing = this.route.snapshot.queryParams
    //this.housing = GlobalVar.current_housing

    if (!User.id) {
      this.router.navigate(['login'])
    }
  }

  ngOnInit() {
    this.getAllBuildings()

    this.dataservice.editBuilding$.subscribe(res => {
      this.getAllBuildings()
    })

    this.dataservice.addBuilding$.subscribe(res => {
      // this.buildings.push(res)
      this.getAllBuildings()
    })
  }
  buildings: Building[] = []

  housing: Housing

  onBack() {
    this.location.back()
  }
  onAddBuilding() {
    this.dialog.open(BuildingComponent, { data: this.housing.id })
  }
  onSelectBuilding(item) {
    GlobalVar.current_building = item
    this.router.navigate(['/building'], { queryParams: item })

  }

  getAllBuildings() {
    this.dbservice.getHousingBuildings(this.housing.id).subscribe(res => {
      this.buildings = res
    })
  }

  onLongPress(item) {
    console.log("longpress")
    this.dialog.open(BuildingComponent, { data: item })
  }

}

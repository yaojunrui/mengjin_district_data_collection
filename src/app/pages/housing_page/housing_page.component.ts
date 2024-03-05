import { ChangeDetectorRef, Component } from '@angular/core';
import { GlobalVar, User } from '../../user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Housing } from '../../type';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HousingComponent } from '../../components/housing/housing.component';
import { DbService } from '../../services/db.service';
import { DataService } from '../../services/data.service';
import { LongPressDirective } from '../../longpress';
import { query } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-housing_page',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LongPressDirective, MatButtonModule],
  templateUrl: './housing_page.component.html',
  styleUrl: './housing_page.component.css'
})
export class HousingPageComponent {
  constructor(private router: Router, private dialog: MatDialog, private dbservice: DbService,
    private dataservice: DataService, private cdr: ChangeDetectorRef) {
    if (!User.id) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.getHousings()
    this.dataservice.addHousing$.subscribe(res => {
      this.housings.push(res)
    })
    this.dataservice.editHousing$.subscribe(res => {
      const index = this.housings.findIndex(h => h.id = res.id)
      this.housings[index] = res
    })

    if (!User.id) {
      this.router.navigate(['login'])
    }
  }

  housings: Housing[]

  onLongPress(item) {
    console.log("longpress")
    this.dialog.open(HousingComponent, { data: item })
  }

  onSelectHosing(item) {
    this.router.navigate(['/buildings'], { queryParams: item })
    GlobalVar.current_housing = item
  }

  onAddHousing() {
    this.dialog.open(HousingComponent)

  }

  private getHousings() {
    this.dbservice.getHousings().subscribe(res => {
      console.log(res)
      this.housings = res
    })
  }

}

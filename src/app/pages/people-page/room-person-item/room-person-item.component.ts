import { Component, Input } from '@angular/core';
import { People } from '../../../type';
import { DataService } from '../../../services/data.service';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { EditPersonComponent } from '../../../components/edit-person/edit-person.component';


@Component({
  selector: 'app-room-person-item',
  standalone: true,
  imports: [],
  templateUrl: './room-person-item.component.html',
  styleUrl: './room-person-item.component.css'
})
export class RoomPersonItemComponent {

  private _person: People = {};
  public get person(): People {
    return this._person;
  }
  @Input()
  public set person(value: People) {
    this._person = value;
    this.imgUrl = this.serverImgDir + value.photo_url
  }

  constructor(private dataservice: DataService, private dialog: MatDialog) {

  }

  imgUrl: string
  serverImgDir = "http://localhost/mengjin/backend/photos/"


  getBgColor() {
    if (this.person.is_host == 1) {
      return "lightgreen"
    }
    else
      return ""
  }
  onEditPerson() {
    this.dialog.open(EditPersonComponent, { data: this.person })
  }
  onDelPerson() {
    Swal.fire({
      title: "Do you want to delete this person?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire("Saved!", "", "success");
        this.dataservice.deletePerson(this.person)
      }
    });

  }

}

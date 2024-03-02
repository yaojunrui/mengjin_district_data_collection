import { Component, EventEmitter, Input, Output } from '@angular/core';
import { People } from '../../../type';

@Component({
  selector: 'app-people-item',
  standalone: true,
  imports: [],
  templateUrl: './people-item.component.html',
  styleUrl: './people-item.component.css'
})
export class PeopleItemComponent {

  imgUrl: string
  pInfo: string
  private _data: People;
  private serverImg = 'http://localhost/mengjin/backend/photos/'

  @Output() selectPeople: EventEmitter<People> = new EventEmitter();
  @Input()
  set data(value: People) {
    this._data = value;
    if (value.photo_url) {

      this.imgUrl = this.serverImg + value.photo_url;
      // console.log(this.imgUrl)
    }
    else {
      this.imgUrl = 'assets/noPhoto.png'
    }
    if (!value.id) {
      this.imgUrl = 'assets/add.png';
      this.pInfo = '添加人员'
    } else {
      this.pInfo = value.name + '-' + value?.pid.substring(6, 10);
    }
  }
  onClick() {
    this.selectPeople.emit(this._data)
  }

  onImgError(e) {
    e.target.src = 'assets/noPhoto.png'
  }
}

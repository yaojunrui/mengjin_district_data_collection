import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import IDValidator from 'id-validator'
import { People, TableName } from '../../../type';
import multiavatar from '@multiavatar/multiavatar'
import { faker } from '@faker-js/faker'
import copy from 'fast-copy';
import { HttpClient } from '@angular/common/http';
import { DbService } from '../../../services/db.service';

const randomIcon = `<svg t="1695112984643" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4022" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M488 72.896a48 48 0 0 1 43.456-2.304l4.544 2.304L880.256 271.68a48 48 0 0 1 23.776 36.928l0.224 4.64V710.72a48 48 0 0 1-20.096 39.04l-3.904 2.56-344.256 198.72a48 48 0 0 1-43.456 2.336l-4.544-2.304L143.744 752.32a48 48 0 0 1-23.776-36.928l-0.224-4.64V313.28c0-15.616 7.552-30.112 20.096-39.04l3.904-2.56L488 72.96z m-304.32 282.88l0.032 345.728L480 872.544V531.52l-4-6.944-292.288-168.8z m656.576 0l-292.288 168.768-3.968 6.88v341.12l296.256-171.04V355.776zM384 688.16c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16z m384-63.872c17.664-8.64 32-1.376 32 16.32 0 17.664-14.336 39.04-32 47.68-17.664 8.672-32 1.376-32-16.288s14.336-39.04 32-47.68z m-512-0.128c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16z m384-64c17.664-8.768 32-1.536 32 16.16 0 17.664-14.336 39.072-32 47.84-17.664 8.736-32 1.504-32-16.16s14.336-39.104 32-47.84z m-256-32c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16z m-128-64c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16z m256-331.232L218.848 302.144l293.12 169.28 293.12-169.28L512 132.928zM512 272c26.496 0 48 14.336 48 32s-21.504 32-48 32-48-14.336-48-32 21.504-32 48-32z" fill="#d4237a" p-id="4023"></path></svg>`

@Component({
  selector: 'app-add-people',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.css'
})
export class AddPeopleComponent {
  constructor(private sanitizer: DomSanitizer, iconRegistry: MatIconRegistry, private http: HttpClient, private dbservice: DbService) {
    iconRegistry.addSvgIconLiteral(
      'random',
      sanitizer.bypassSecurityTrustHtml(randomIcon)
    );

  }

  ngOnInit() {
    this.uuid = faker.string.uuid()
    this.svgData = multiavatar(this.uuid)
    this.svgImg = this.sanitizer.bypassSecurityTrustHtml(copy(this.svgData));//针对svg图片的显示
  }

  @Output() cancelAddNew: EventEmitter<null> = new EventEmitter();
  @Output() addPeopleSuccess: EventEmitter<People> = new EventEmitter();
  @Input()
  set data(value: People) {
    if (value) {
      if (value.name) {
        this.pName = value.name
      } else if (value.pid) {
        this.pid = value.pid
      }
    }
  }

  pName: string
  pid: string
  tel: string
  svgImg: any = '';
  svgData: string = ''
  uuid: string
  phpurl

  onSubmit() {
    this.saveAndUpload().subscribe(res => {
      console.log(res)
      const data = this.getData()

      console.log(data)
      this.dbservice.insert(TableName.people, data).subscribe(res => {
        data.id = res
        this.addPeopleSuccess.emit(data)
      })
    })
  }
  onCancel() {
    this.cancelAddNew.emit()
  }
  onRandomPid() {
    const validator = new IDValidator();
    this.pid = validator.makeID();
  }

  onRandomtel() {
    this.tel = this.getMoble()
  }

  private getMoble() {

    var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");

    var i = parseInt(10 * Math.random() + "");

    var prefix = prefixArray[i];

    for (var j = 0; j < 8; j++) {

      prefix = prefix + Math.floor(Math.random() * 10);

    }

    return prefix;

  }
  private getGender(pid) {
    return Number(pid.substring(16, 17)) % 2 == 0 ? 1 : 2;
  }

  private getData() {
    let data: any = {
      name: this.pName,
      pid: this.pid,
      gender: this.getGender(this.pid),
      photo_url: this.uuid + '.svg'
    };
    if (this.tel) {
      data.tel = this.tel;
    }

    return data;
  }

  private saveAndUpload() {
    const svgData = this.svgData;
    const phpurl = 'mengjin/backend/upload.php'
    // Create a Blob from the SVG data
    const blob = new Blob([svgData], { type: 'image/svg+xml' });

    // Create a FormData object and append the Blob
    const formData = new FormData();
    formData.append('svgFile', blob, this.uuid + '.svg');

    // Perform a POST request to upload the file to the server
    return this.http.post(phpurl, formData)

  }


}

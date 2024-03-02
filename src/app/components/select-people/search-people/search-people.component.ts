import { InputModalityDetector } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import IDValidator from 'id-validator'
import { DbService } from '../../../services/db.service';
import { People } from '../../../type';

const iconClear = `<svg t="1685117430288" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5533" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M958.358489 152.199401l-89.399099-89.430822L511.17368 420.522566 153.388994 62.768579 63.988872 152.199401l357.785709 357.753987L63.988872 867.708398l89.400123 89.430822L511.17368 599.38421l357.785709 357.753987 89.399099-89.430822L600.573803 509.953388 958.358489 152.199401z" fill="#666666" p-id="5534"></path></svg>`
const iconClear_over = `<svg t="1685117430288" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5533" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M958.358489 152.199401l-89.399099-89.430822L511.17368 420.522566 153.388994 62.768579 63.988872 152.199401l357.785709 357.753987L63.988872 867.708398l89.400123 89.430822L511.17368 599.38421l357.785709 357.753987 89.399099-89.430822L600.573803 509.953388 958.358489 152.199401z" fill="#d4237a" p-id="5534"></path></svg>`
const iconClear2 = `<svg t="1694485031057" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4032" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 32C246.4 32 32 246.4 32 512s214.4 480 480 480 480-214.4 480-480S777.6 32 512 32z m140.8 579.2c12.8 12.8 12.8 32 0 41.6-12.8 12.8-32 12.8-41.6 0L512 553.6l-99.2 99.2c-12.8 12.8-32 12.8-41.6 0s-12.8-32 0-41.6l99.2-99.2-99.2-99.2c-12.8-12.8-12.8-32 0-41.6 12.8-12.8 32-12.8 41.6 0l99.2 99.2 99.2-99.2c12.8-12.8 32-12.8 41.6 0 12.8 12.8 12.8 32 0 41.6L553.6 512l99.2 99.2z" p-id="4033" fill="#bfbfbf"></path></svg>`

const enum IconName {
  clear = 'iconCleat',
  clearOver = 'iconClearOver',
  clear2 = 'aa'
}

const enum InputType {
  pid = 1,
  name = 2,
  tel = 3
}

@Component({
  selector: 'app-search-people',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule, MatIconModule, MatInputModule],
  templateUrl: './search-people.component.html',
  styleUrl: './search-people.component.css'
})
export class SearchPeopleComponent {

  @Output() peoples: EventEmitter<People[]> = new EventEmitter();
  label: string
  private _keyword: string;
  public get keyword(): string {
    return this._keyword;
  }
  public set keyword(value: string) {
    this._keyword = value;

    this.isShowBtnClear = value.length >= 2

  }
  isShowBtnClear: boolean = false
  iconClear = IconName.clear;
  iconClear2 = IconName.clear2;

  constructor(sanitizer: DomSanitizer, iconRegistry: MatIconRegistry, private dbservice: DbService) {
    this.registerIcon(sanitizer, iconRegistry);
  }



  onclickBtnClear() {
    this.keyword = ""
  }
  onSumbit() {
    let inputType
    let p: People = {} //虚拟人员不存在
    if (this.isChinese(this.keyword)) {
      inputType = InputType.name
      p.name = this.keyword

    }
    else if (this.isPid(this.keyword)) {
      inputType = InputType.pid
      p.pid = this.keyword
    }

    if (inputType) {

      this.dbservice.getPeople(inputType, this.keyword).subscribe(res => {
        res.push(p)
        this.peoples.emit(res);
        this.keyword = ''
      }
      )
    } else {
      this.peoples.emit([])
    }


  }

  private isPhone(phoneNumber) {
    const phoneRegex = /^1[3456789]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  }
  private isChinese(str: string) {
    const re = /^[\u4E00-\u9FA5]+$/g;
    if (!re.test(str)) return false;
    return true;
  }
  private isPid(str: string) {
    const validator = new IDValidator();
    return validator.isValid(str)
  }
  private registerIcon(sanitizer: DomSanitizer, iconRegistry: MatIconRegistry) {

    iconRegistry.addSvgIconLiteral(
      IconName.clear,
      sanitizer.bypassSecurityTrustHtml(iconClear)
    );

    iconRegistry.addSvgIconLiteral(
      IconName.clearOver,
      sanitizer.bypassSecurityTrustHtml(iconClear_over)
    );

    iconRegistry.addSvgIconLiteral(
      IconName.clear2,
      sanitizer.bypassSecurityTrustHtml(iconClear2)
    );
  }

}

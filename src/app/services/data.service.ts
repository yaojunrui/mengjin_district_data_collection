// data.service.ts

import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Building, Housing, People } from '../type';



export enum MessageType {
  delPersonFromBuilding = 'delPersonFromBuilding',
  startPickMapPoint = 'startMove',
  refreshMark = 'refreshMark',
  clickMap = 'clickMap',
  uploadFile = 'uploadFile',
  closePeoplePlanel = 'closePeoplePlanel',
  saveLocation = "saveLocation",
  changeLayer = 'changeLayer',
  addBuilding = 'addBuilding',
  editBuilding = 'editBuilding',
  clearSketchGraphic = 'clearSketchGraphic',
  uploadPhotoComplete = 'uploadPhotoComplete',
  addHosing = 'addHosing',
  getUserInfo = 'getUserInfo',
  login_success = 'login_success'
  // closeDialog = 'closeDialog'
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private _selectPersons = new Subject<any[]>();
  selectPersons$ = this._selectPersons.asObservable();
  selectPersons(data: any[]) {
    this._selectPersons.next(data);
  }

  private _addHousing = new Subject<Housing>();
  addHousing$ = this._addHousing.asObservable();
  addHousing(data: Housing) {
    this._addHousing.next(data);
  }

  private _editHousing = new Subject<Housing>();
  editHousing$ = this._editHousing.asObservable();
  editHousing(data: Housing) {
    this._editHousing.next(data);
  }

  private _getPeopleExtension = new Subject<any>();
  getPeopleExtension$ = this._getPeopleExtension.asObservable();
  getPeopleExtension(data: any) {
    this._getPeopleExtension.next(data);
  }

  private _deletePerson = new Subject<People>();
  deletePerson$ = this._deletePerson.asObservable();
  deletePerson(data: People) {
    this._deletePerson.next(data);
  }

  private _editBuilding = new Subject<Building>();
  editBuilding$ = this._editBuilding.asObservable();
  editBuilding(data: Building) {
    this._editBuilding.next(data);
  }

  private _addBuilding = new Subject<Building>();
  addBuilding$ = this._addBuilding.asObservable();
  addBuilding(data: Building) {
    this._addBuilding.next(data);
  }

  private _message = new Subject<MessageType>();
  message$ = this._message.asObservable();
  sendMessage(m: MessageType) {
    this._message.next(m);
  }

  // private _personExtension = new Subject<People>();
  // personExtension$ = this._personExtension.asObservable();
  // personExtension(data:People) {
  //   this._personExtension.next(data);
  // }

  private _deleteBuildingPerson = new Subject<number>();
  deleteBuildingPerson$ = this._deleteBuildingPerson.asObservable();
  deleteBuildingPerson(person_id: number) {
    this._deleteBuildingPerson.next(person_id);
  }

  private _selectDate = new Subject<any>();
  selectDate$ = this._selectDate.asObservable();
  selectDate(selectDate: any) {
    this._selectDate.next(selectDate);
  }

  // private routeData: any={};

  // setRouteData(key:string,data: any): void {
  //   this.routeData[key] = data;
  // }

  // getRouteData(key:string): any {
  //   return this.routeData[key];
  // }
}

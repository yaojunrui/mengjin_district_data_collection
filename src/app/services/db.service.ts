import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const PHP_SQL_URL = '/mengjin/backend/db.php'

enum PhpMethodNames {
  SELECT_HOSINGS = "selectHosings",
  GET_HOSING_BUILDINGS = "getHosingBuildings",
  GET_PEOPLE = "getPeople",
  GET_HOME_PEOPLES = "getHomePeoples",
  GET_ROOM_PEOPLES = "getRoomPeoples",
  GET_USER_INFO = "getUserInfo",
  GET_USER_WORK = "getUserWork",
  GET_ALL_ROOM_STATUS = "getAllRoomStatus",
  GET_USER_BUILDING_PERSONNEL = "getUserBuildingPersonnel",
  GET_SELECT_RESULT = "getSelectResult",
  GET_ROOM_STATUS = 'getRoomStatus',
  GET_ROOM_WORK_IS_EXISTS = 'getRoomWorkIsExists',
  INSERT = "insert",
  UPDATE = "update",
  DELETE = "delete",
  UPDATA_ROOM_STATUS = "updateRoomStatus"
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  exec(phpFunc, data) {
    return this.http.post<any>(PHP_SQL_URL, { 'func': phpFunc, 'data': data })
  }

  checkUserInfo(user_name, password) {
    return this.exec(PhpMethodNames.GET_USER_INFO, { user_name, password })
  }

  insert(table_name, table_data) {
    return this.exec(PhpMethodNames.INSERT, { tableName: table_name, tableData: table_data })
  }

  getHousings() {
    return this.exec(PhpMethodNames.SELECT_HOSINGS, null)
  }

  getHousingBuildings(housing_id) {
    return this.exec(PhpMethodNames.GET_HOSING_BUILDINGS, housing_id).pipe(
      map(buildings => buildings.map(building => {
        building.unit_home = JSON.parse(building.unit_home);
        return building;
      }))
    )
  }

  update(table_name, table_data, id) {
    return this.exec(PhpMethodNames.UPDATE, { tableName: table_name, tableData: table_data, id: id })
  }

  getPeople(type, keyword) {
    return this.exec(PhpMethodNames.GET_PEOPLE, { inputType: type, input: keyword })
  }

  getRoomPeople(buildingId, roomNumber) {
    return this.exec(PhpMethodNames.GET_ROOM_PEOPLES, { building_id: buildingId, room_number: roomNumber })
  }

  updateRoomStatus(data: any) {
    return this.exec(PhpMethodNames.UPDATA_ROOM_STATUS, data)
  }

  delete(data) {
    return this.exec(PhpMethodNames.DELETE, data)
  }

  getAllRoomStatus(building_id) {
    return this.exec(PhpMethodNames.GET_ALL_ROOM_STATUS, building_id)
  }

  getRoomStatus(building_id, room_number) {
    return this.exec(PhpMethodNames.GET_ROOM_STATUS, { building_id: building_id, room_number: room_number })
  }

}

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
  GET_BUILDING_WORK_INFO = "getBuildingWorkInfo",
  GET_USER_BUILDING_PERSONNEL = "getUserBuildingPersonnel",
  GET_SELECT_RESULT = "getSelectResult",
  GET_ROOM_WORK_INFO = 'getRoomWorkInfo',
  GET_ROOM_WORK_IS_EXISTS = 'getRoomWorkIsExists',
  INSERT = "insert",
  UPDATE = "update",
  DELETE = "delete"
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

}

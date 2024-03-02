import { Component, EventEmitter, Output } from '@angular/core';
import { People } from '../../type';
import toastr from 'toastr';
import { CommonModule } from '@angular/common';
import { AddPeopleComponent } from './add-people/add-people.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { PeopleItemComponent } from './people-item/people-item.component';

enum peopleState {
  query,
  queryComplete,
  addNew
}

@Component({
  selector: 'app-select-people',
  standalone: true,
  imports: [CommonModule, AddPeopleComponent, SearchPeopleComponent, PeopleItemComponent],
  templateUrl: './select-people.component.html',
  styleUrl: './select-people.component.css'
})
export class SelectPeopleComponent {

  ngOnInit() {
    this.setState(peopleState.query)
  }

  @Output()
  selectedPeople: EventEmitter<People> = new EventEmitter();

  isShowQuery: boolean
  isShowPeoples: boolean
  isShowAddPeople: boolean;

  queryPeoples: People[];
  newPeople: People;

  message: string = '';

  onQueryComplete(peoples: People[]) {
    this.queryPeoples = this.uniqueArray(peoples);
    console.log(this.queryPeoples)
    this.setState(peopleState.queryComplete)
  }

  onSelectPeople(p: People) {
    if (p.id > 0) {
      this.selectedPeople.emit(p);
      console.log(p)
      this.setState(peopleState.query);
    } else {
      this.newPeople = p;
      this.setState(peopleState.addNew)
    }
  }

  onCancelAddNew() {
    this.setState(peopleState.queryComplete)
  }

  private setState(state: peopleState) {
    if (state == peopleState.query) {
      this.setUI(true, false, false);
      this.message = '请查询需要的人员'
    } else if (state == peopleState.queryComplete) {
      this.setUI(true, true, false)
      this.message = '请从列表中选择人员，如果人员不存在，点最后的添加人员';
      toastr.info('请选择人员')
    } else if (state == peopleState.addNew) {
      this.setUI(false, false, true)
      this.message = '添加人员'
    }
  }

  private setUI(isShowQuery, isShowPeoples, isShowAddPeople) {
    this.isShowQuery = isShowQuery;
    this.isShowPeoples = isShowPeoples;
    this.isShowAddPeople = isShowAddPeople;
  }

  private uniqueArray(arr: People[]) {
    let temp = [];
    arr.forEach(p => {
      if (temp.findIndex(p2 => p.id == p2.id) == -1) {
        temp.push(p)
      }
    })
    return temp;
  }
}

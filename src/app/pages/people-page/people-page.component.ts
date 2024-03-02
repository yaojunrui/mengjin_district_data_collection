import { Component } from '@angular/core';
import { SelectPeopleComponent } from "../../components/select-people/select-people.component";

@Component({
  selector: 'app-people-page',
  standalone: true,
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.css',
  imports: [SelectPeopleComponent]
})
export class PeoplePageComponent {

  constructor() {

  }

  onSelectPeople(p) {

  }


}

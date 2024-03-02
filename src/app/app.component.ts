import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchPeopleComponent } from "./components/select-people/search-people/search-people.component";
import { AddPeopleComponent } from "./components/select-people/add-people/add-people.component";
import { SelectPeopleComponent } from "./components/select-people/select-people.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SearchPeopleComponent, AddPeopleComponent, SelectPeopleComponent]
})
export class AppComponent {
  title = 'mengjin';

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // TODO: is on, when header should be displayed e.g. not in the HomeComponent
  header: boolean = true;

  title = 'World of Fossils';
}

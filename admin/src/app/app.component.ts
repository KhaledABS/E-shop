import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'admin';
  showLogin: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        if (event.url === '/') {
          this.showLogin = true;
        } else {
          this.showLogin = false;
        }
      }
    });
  }


}

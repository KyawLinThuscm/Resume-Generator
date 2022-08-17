import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Resume-Generator';
  public showHeader = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/preview/undefined' ) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
        if(this.router.url === '/') {
          this.router.navigate(['']);
        }
      }
    }
  )
  }
}

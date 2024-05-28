import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  isVisible: boolean = true;
  isLoggedIn = false;

  constructor(private router: Router,private authService: AuthService) { 
    this.authService.isLoggedIn.subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isVisible = !event.url.includes('signup');
      }
    });
  }
  logout() {
    this.authService.logout();
  }
}

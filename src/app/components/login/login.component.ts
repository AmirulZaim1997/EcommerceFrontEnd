import { Component, OnInit } from '@angular/core';  
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';  

import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
       
        alert('Login successful');
        // Navigate to a different page if needed
        this.router.navigate(['/products']);
        console.log(response);
      },
      error => {
        alert('Login failed');
        console.log(error.message); // Log the response body
      }
    );
  }
}

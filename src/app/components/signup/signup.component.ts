import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import { AuthService } from '../../services/auth.service';


import { Router } from '@angular/router';  

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  
  
  constructor(private authService: AuthService, private router: Router) { }  

  register() {
    this.authService.register(this.username, this.password,this.email,this.firstName,this.lastName).subscribe(
      response => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error => {
        alert('Registration failed');
      }
    );
  }
}
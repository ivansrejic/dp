import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onSubmit() {
    // Handle form submission here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
  login() {
    if (this.email == '' || this.password == '') {
      alert('Please enter email and password');
      return;
    }
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}

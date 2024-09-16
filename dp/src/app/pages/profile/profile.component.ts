import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { UserData } from '../../models/user-data.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Add your styles here
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: UserData | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // Optional
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        });
        this.user = user;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      this.authService
        .updateUserProfile(updatedUser)
        .then(() => {
          console.log('Profile updated successfully');
          alert('Profile updated successfully');
        })
        .catch((error) => {
          console.error('Error updating profile', error);
          alert('Error updating profile');
        });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}

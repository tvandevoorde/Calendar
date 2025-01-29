import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginButtonComponent } from "../../../auth/components/login-button/login-button.component";
import { CommonModule } from '@angular/common';
import { AuthGoogleService } from '../../../auth/auth-google.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, LoginButtonComponent],
  template: `
    <nav class="navbar">
      <a class="navbar-brand" href="/">TIREA</a>
      <div class="navbar-links">
        <app-login-button></app-login-button>
        <button *ngIf="isAuthenticated()" (click)="goToUserProfile()">User Profile</button>
      </div>
    </nav>
  `,
  styles: `
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #333;
      color: white;
      padding: 10px;
    }

    .navbar-links button {
      background-color: #4285f4;
      color: white;
      border: none;
      padding: 10px;
      margin-left: 10px;
      border-radius: 5px;
      cursor: pointer;
    }

    .navbar-links button:hover {
      background-color: #357ae8;
    }

    .navbar-brand {
      font-size: 1.5em;
      font-weight: bold;
      text-decoration: none;
      color: white;
    }
  `
})
export class NavbarComponent {
  isAuthenticated = this.authService.isAuthenticated;
  
  constructor(private authService: AuthGoogleService, private router: Router) {}

  goToUserProfile(): void {
    this.router.navigate(['/user-profile']);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGoogleService } from '../../auth-google.service';

@Component({
  selector: 'app-login-button',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="login-button" *ngIf="!isAuthenticated()">
      <button mat-raised-button (click)="signInWithGoogle()">Sign in</button>
    </div>
    <div class="logout-button" *ngIf="isAuthenticated()">
      <button mat-raised-button (click)="signOffWithGoogle()">Sign out</button>
    </div>
  `,
  styles: ``
})
export class LoginButtonComponent {
  isAuthenticated = this.authService.isAuthenticated;
  constructor(private authService: AuthGoogleService) {}
  signInWithGoogle() {
    this.authService.login();
  }
  signOffWithGoogle() {
    this.authService.logout();
  }
}

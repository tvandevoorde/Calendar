import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  template: `
    <pre>{{ profile() | json }}</pre>
  `,
  styles: ``
})
export class UserProfileComponent {
  profile: any = this.authService.profile;
  editing = false;

  constructor(private authService: AuthGoogleService) {}

}

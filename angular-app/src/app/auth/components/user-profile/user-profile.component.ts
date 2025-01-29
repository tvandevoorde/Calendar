import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile } from './models/user-profile.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  template: `
    <pre>{{ userProfile() | json }}</pre>
    <pre>{{ profile | json }}</pre>
  `,
  styles: ``
})
export class UserProfileComponent implements OnInit {
  userProfile: any = this.authService.profile;
  profile?: UserProfile;
  editing = false;
  constructor(private http: HttpClient, private authService: AuthGoogleService) {}

  ngOnInit() {
    this.http.get<UserProfile>('/api/user', {
      headers: { 'Authorization': `Bearer ${ this.authService.token }` }
    }).subscribe(profile => this.profile = profile);
  }

}

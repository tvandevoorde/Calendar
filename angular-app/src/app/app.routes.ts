import { Routes } from '@angular/router';
import { UserProfileComponent } from './auth/components/user-profile/user-profile.component';
import { HomepageComponent } from './home/homepage/homepage.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'user-profile', component: UserProfileComponent },
];

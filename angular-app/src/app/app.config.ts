import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { EnvironmentModel } from '../environments/environment.model';
import { environment } from '../environments/environment';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './auth/auth.interceptor';

export const APP_CONFIG = new InjectionToken<EnvironmentModel>(
  'Application config'
);

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: APP_CONFIG, useValue: environment},
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};

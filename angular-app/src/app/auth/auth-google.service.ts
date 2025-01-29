import { Inject, Injectable, signal } from "@angular/core";
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { APP_CONFIG } from '../app.config';

@Injectable({
  providedIn: "root",
})
export class AuthGoogleService {
  private authConfig: AuthConfig;
  claims = signal<any>(null);
  profile = signal<any>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private oAuthService: OAuthService, 
    @Inject(APP_CONFIG) appConfig: any) {
    this.authConfig = this.getAuthConfig(appConfig.googleClientId);
    this.initConfiguration();
  }

  getAuthConfig(googleClientId: string): AuthConfig {
    return {
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin,
      clientId: googleClientId,
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false,
    };
  }

  initConfiguration(): void {
    this.oAuthService.configure(this.authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.isAuthenticated.set(this.oAuthService.hasValidIdToken());
      if (this.oAuthService.hasValidIdToken()) {
        this.claims.set(this.oAuthService.getIdentityClaims());
        this.profile.set(this.oAuthService.loadUserProfile());
        this.sendTokenToBackend(this.oAuthService.getIdToken());
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.profile.set(null);
    this.isAuthenticated.set(false);
  }

  get token() {
    return this.oAuthService.getAccessToken();
  }

  sendTokenToBackend(idToken: string) {
  
    fetch('/api/auth/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: idToken }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Backend Response:', data);
      localStorage.setItem('authToken', data.jwt);
    });
  }

}

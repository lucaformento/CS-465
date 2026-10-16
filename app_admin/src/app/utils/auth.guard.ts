import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

// Send logged-out users to the login page
export const authGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  return authenticationService.isLoggedIn() ? true : router.createUrlTree(['/login']);
};

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let storageUser = localStorage.getItem('user');
  if (storageUser) {
    try {
      let response = await authService.isAuthenticated().toPromise();
      if (response.valid) {
        return true;
      } 
      router.navigate(['/']);
      return false;
    } catch (error) {
      console.log(error);
      router.navigate(['/']);
      return false;
    }
  } else {
    router.navigate(['/']);
    return false;
  }
};

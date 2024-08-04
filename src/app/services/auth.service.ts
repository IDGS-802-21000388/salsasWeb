// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('loggedUser');
    return user !== null;
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.rol;
    }
    return null;
  }

  hasRole(expectedRoles: string[]): boolean {
    const role = this.getUserRole();
    return role ? expectedRoles.includes(role) : false;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }
}

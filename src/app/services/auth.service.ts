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

  getUserId(): number | null {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      try {
        const userObj = JSON.parse(user);
        if (userObj.idUsuario) {
          return userObj.idUsuario;
        } else {
          console.error('El objeto del usuario no contiene un campo idUsuario');
        }
      } catch (err) {
        console.error('Error al parsear el objeto del usuario en localStorage', err);
      }
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }
}

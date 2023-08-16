import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('user')
  );
  user$ = this.userSubject.asObservable();

  login(username: string): void {
    localStorage.setItem('user', username);
    this.userSubject.next(username);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  get userValue(): string | null {
    return this.userSubject.value;
  }
}

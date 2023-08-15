import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject = new BehaviorSubject<string | null>(null);
  user$ = this.userSubject.asObservable();

  login(username: string): void {
    this.userSubject.next(username);
  }

  logout(): void {
    this.userSubject.next(null);
  }

  get userValue(): string | null {
    return this.userSubject.value;
  }
}

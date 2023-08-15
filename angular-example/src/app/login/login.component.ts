import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (this.loginService.userValue) {
      this.router.navigate(['/notes']);
    }
  }

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    const { username, password } = this.loginForm.value;

    if (this.loginForm.invalid || !username || !password) {
      alert('Morate uneti korisnicko ime i lozinku.');
      return;
    }

    this.loginService.login(username);
    this.router.navigate(['/notes']);
  }
}

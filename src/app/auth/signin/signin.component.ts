import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  styleUrls: ['./signin.component.css'],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  private static buildForm = (): FormGroup =>
    new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6)]),
    });
  form: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form = SigninComponent.buildForm();
  }

  onSubmit = () =>
    this.authService
      .signIn(this.form.value.email.trim(), this.form.value.password.trim())
      .catch(e => console.error(e));
}

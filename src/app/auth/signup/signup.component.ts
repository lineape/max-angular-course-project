import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.css'],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  private static passwordsMatch = (control: AbstractControl) =>
    control.get('password1').value === control.get('password2').value
      ? null
      : { passwords: 'Passwords do not match' };

  private static buildForm = (): FormGroup =>
    new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwords: new FormGroup(
        {
          password1: new FormControl(null, [Validators.minLength(6)]),
          password2: new FormControl(null, [Validators.minLength(6)]),
        },
        SignupComponent.passwordsMatch,
      ),
    });

  form: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form = SignupComponent.buildForm();
  }

  onSubmit = () =>
    this.authService
      .signUp(
        this.form.value.email.trim(),
        this.form.value.passwords.password.trim(),
      )
      .catch(e => console.log(e));
}

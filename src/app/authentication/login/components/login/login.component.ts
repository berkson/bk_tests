import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuidv4 } from 'uuid';
import { Auths, HttpUtilService, Role, User } from '../../../../shared';
import { Credential } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (form: FormControl) => form && form.invalid,
  };

  constructor(
    private fb: FormBuilder,
    private httpUtils: HttpUtilService,
    private router: Router
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.form.invalid) return;
    const credential: Credential = this.form.value;
    let authString: string = credential.username + ':' + credential?.password;
    let user = new User().full(
      uuidv4(),
      'TT01162',
      'Berkson',
      'berksonx@yahoo.com.br',
      [new Role().full(uuidv4(), 'ROLE_ADMIN', 'Adminstrador')]
    );
    this.httpUtils.user = user;
    let isAdmin = this.httpUtils
      .getUserRoles()
      .some((r) => r.authority === Auths.ADMIN);
    let isUser = this.httpUtils
      .getUserRoles()
      .some((r) => r.authority === Auths.USER);
    this.httpUtils.authenticated =
      this.httpUtils.user.code != null && (isAdmin || isUser);
    this.httpUtils.user.auth = `Basic ${window.btoa(authString)}`;

    if (isAdmin) {
      this.router.navigate(['homepage']).then(() => {
        window.location.reload(); // verificar a correção para isso aqui
      });
      return;
    }
  }
}


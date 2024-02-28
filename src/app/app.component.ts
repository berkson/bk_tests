import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './home';
import { User } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bk_tests';
  private _user: User;
  private _opened: boolean = true;

  constructor() {
    this._user = new User().full(
      1,
      'TT01162',
      'Berkson',
      'berksonx@yahoo.com.br'
    );
  }

  exit(): void {
    console.log('Sai fora');
  }

  authenticated(): boolean {
    return true;
  }

  public get opened(): boolean {
    return this._opened;
  }

  public set opened(value: boolean) {
    this._opened = value;
  }

  public get user(){
    return this._user;
  }

}

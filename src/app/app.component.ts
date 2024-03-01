import { Component, HostListener } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SidebarComponent } from './home';
import {
  HttpUtilService,
  MessageService,
  MessageType,
  Role,
  User,
} from './shared';
import { ErrorMessages } from './shared/messages';

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
  public static readonly USER_KEY: string = 'user';
  private _user: User = new User();
  private _opened: boolean = false;

  constructor(
    private router: Router,
    private httpUtils: HttpUtilService,
    private messageService: MessageService
  ) {
    // somente para teste
    this._user = new User().full(
      uuidv4(),
      'TT01162',
      'Berkson',
      'berksonx@yahoo.com.br',
      [new Role().full(uuidv4(), 'ROLE_ADMIN', 'Adminstrador')]
    );
    this._user.auth = 'ihbgprigbreigberiupgber';
    localStorage.setItem(
      AppComponent.USER_KEY,
      JSON.stringify(this._user.toJSON())
    );
    // fim do teste
    if (localStorage.getItem(AppComponent.USER_KEY) !== null) {
      let user: User = User.fromObject(
        JSON.parse(localStorage.getItem(AppComponent.USER_KEY)!)
      );
      this.router.events
        .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
        .subscribe({
          next: (event: { id: Number; url: any; urlAfterRedirects: any }) => {
            if (event.id === 1 && event.url === event.urlAfterRedirects) {
              try {
                if (user.auth) {
                  this.httpUtils.user = user;
                  this._user = user;
                  this.httpUtils.authenticated =
                    user.code !== null && user.code !== undefined;
                  this.delete();
                }
              } catch (e) {
                this.messageService.snackMessage(
                  ErrorMessages.tryAgain,
                  MessageType.ERROR
                );
                this.httpUtils.exit();
              }
            }
          },
        });
    }
  }

  delete() {
    localStorage.removeItem(AppComponent.USER_KEY);
  }

  exit(): void {
    this.httpUtils.exit();
  }

  authenticated(): boolean {
    return this.httpUtils.authenticated;
  }

  public get opened(): boolean {
    return this._opened;
  }

  public set opened(value: boolean) {
    this._opened = value;
  }

  public get user() {
    return this._user;
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.processUserData();
  }

  processUserData() {
    if (this.httpUtils.getAuth() !== undefined) {
      let user: string = JSON.stringify(this.httpUtils.user);
      localStorage.setItem(
        AppComponent.USER_KEY,
        user
      );
    }
  }

  @HostListener('contextmenu', ['$event']) handleVisibilityChange(
    event: Event
  ) {
    this.processHiddenDocument();
  }

  processHiddenDocument() {
    let user: string = JSON.stringify(this.httpUtils.user)
    localStorage.setItem(
      AppComponent.USER_KEY,
      user
    );
    this.startCountDown(60);
  }

  startCountDown(seconds: number) {
    let counter = seconds;

    const interval = setInterval(() => {
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        this.delete();
      }
    }, 1000);
  }

}

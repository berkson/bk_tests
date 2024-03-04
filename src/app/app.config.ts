import { ApplicationConfig, Inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import {
  HttpXsrfTokenExtractor,
  provideHttpClient,
  withInterceptors,
  withXsrfConfiguration,
} from '@angular/common/http';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.routes';
import {
  HttpXsrfCookieExtractor,
  HttpXsrfInterceptor,
  PtBrMatPaginatorIntl,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME,
  XhrInterceptor,
} from './shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    CookieService,
    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
    provideHttpClient(
      withInterceptors([XhrInterceptor, HttpXsrfInterceptor]),
      withXsrfConfiguration({
        cookieName: Inject(XSRF_COOKIE_NAME),
        headerName: Inject(XSRF_HEADER_NAME),
      })
    ),
    provideRouter(
      routes,
      withRouterConfig({onSameUrlNavigation: 'reload'}),
      withComponentInputBinding(),
    ),
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
};

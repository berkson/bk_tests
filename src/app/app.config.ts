import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors,
  withXsrfConfiguration,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.routes';
import { XhrInterceptor } from './shared';
const XSRF_COOKIE_NAME = 'XSRF-TOKEN';
const XSRF_HEADER_NAME = 'X-XSRF-TOKEN';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    CookieService,
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: XSRF_COOKIE_NAME,
        headerName: XSRF_HEADER_NAME,
      }),
      withInterceptors([XhrInterceptor])
    ),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
  ],
};

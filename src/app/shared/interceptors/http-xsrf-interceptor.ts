import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Inject } from '@angular/core';
import { XSRF_HEADER_NAME } from './http-xsrf-cookie-extractor';

export const HttpXsrfInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const tokenService: HttpXsrfTokenExtractor = Inject(HttpXsrfTokenExtractor);
  const headerName: string = Inject(XSRF_HEADER_NAME);
  const lcUrl = req.url.toLowerCase();

  // Skip both non-mutating requests and absolute URLs.
  // Non-mutating requests don't require a token, and absolute URLs require special handling
  // anyway as the cookie set
  // on our origin is not the same as the token expected by another origin.

  if (
    req.method === 'GET' ||
    req.method === 'HEAD' ||
    lcUrl.startsWith('http://') ||
    lcUrl.startsWith('https://')
  ) {
    return next(req);
  }
  const token = tokenService.getToken();

  // Be careful not to overwrite an existing header of the same name.
  if (token !== null && !req.headers.has(headerName)) {
    req = req.clone({ headers: req.headers.set(headerName, token) });
  }

  return next(req);
};

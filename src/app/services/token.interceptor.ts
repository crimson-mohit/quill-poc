import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IkNEQjc2M0NFOTZEN0U4QzIyQzZDQzZBNzI5N0RBMjM3RkYxQjJEQkUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ6YmRqenBiWDZNSXNiTWFuS1gyaU5fOGJMYjQifQ.eyJuYmYiOjE2NjQ1MTAxNDksImV4cCI6MTY2NDU5NjU0OSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5lbmFnby5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hY2NvdW50cy5lbmFnby5jb20vcmVzb3VyY2VzIiwiYXBpMSJdLCJjbGllbnRfaWQiOiJUcmlua2EiLCJzdWIiOiJtb2hpdC5jcmltc29uaUBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOiI2MzgwMDEwNjk0OTIzNTYzMTQiLCJpZHAiOiJsb2NhbCIsIm5hbWUiOiJNb2hpdCAgUGF0aWwiLCJlbWFpbCI6Im1vaGl0LmNyaW1zb25pQGdtYWlsLmNvbSIsIm1lbWJlcnNoaXBpZCI6Ik1PQllWVyIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.YgBN7bIxG1jcRwM4P3Uw42MqK_AEBgzk9a3byHMF0k0_-472O-RRp7_LPjbvMlY655I1hTQuRbLlxVw0-JvivbZxT37130-9xVxi4AkpRQSiRcNwaozT6q69WlYr1uHIE1d0mosKnexzM_By5wWC6Y080P0p4vgIivc9x3riiHLF-udl1toe87XwKpz7exkkRVuBUuJmrUlw9vO7NJ1OqjT1V1MNM0YDlyUqSPBHyHszPOPevFH0bvguYcaMgD10YeaPPBVUZHuc74FjIkxXC9qiSRBV_ptbJOSO8-kKnJN7P1ngE1pVio0N-RKZWnEBCJRakoP7tDW5O_rKGIUeug`;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.token}`
        }
      });
    }

    return next.handle(request).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect user to the logout page
        }
      }
      return throwError(err);
    }))
  }
}

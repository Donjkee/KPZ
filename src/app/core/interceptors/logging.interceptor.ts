import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {finalize, Observable, tap} from 'rxjs';

//виводить в консоль інформацію про кожен HTTP-запит і його результат, такий як метод запиту, URL, час виконання та статус відповіді
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(request)
        .pipe(
            tap({
              // Succeeds when there is a response; ignore other events
              next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
              // Operation failed; error is an HttpErrorResponse
              error: (error) => (ok = 'failed')
            }),
            // Log when response observable either completes or errors
            finalize(() => {
              const elapsed = Date.now() - started;
              const msg = `${request.method} "${request.urlWithParams}"
              ${ok} in ${elapsed} ms.`;
              console.log("catch by logging interceptor");
              console.log(msg);
            })
        );
  }
}

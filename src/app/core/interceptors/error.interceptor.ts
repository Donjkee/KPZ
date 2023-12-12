import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {ToastrService} from "ngx-toastr";


//перехоплює помилки, які виникають під час виконання HTTP-запитів, і виводить їх у вигляді сповіщень за допомогою ToastrService
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          console.log("catch by interceptor");
          if(err.error.errorMessage) {
            this.toastrService.error(err.error.errorMessage, err.status.toString());
          }
          else {
            this.toastrService.error(err.message, err.status.toString());
          }
        }
        throw err;
      }
    ));
  }
}

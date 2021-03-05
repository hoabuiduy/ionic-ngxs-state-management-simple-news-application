import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_HOST } from "src/app/shared/constants";

export class NewsInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request.clone({
            url: `${API_HOST}${request.url}`,
            setHeaders: {
                'X-Api-Key': 'b9583ce538434795b480ed47375d275d'
            }
        }));
    }

}
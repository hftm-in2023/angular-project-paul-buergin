import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const started = performance.now();
  console.log('[HTTP][REQ]', req.method, req.urlWithParams, { headers: req.headers, body: req.body });

  return next(req).pipe(
    tap({
      next: (event) => {
        // Response-Events landen ebenfalls hier (inkl. Body im finalen HttpResponse)
        const elapsed = Math.round(performance.now() - started);
        console.log('[HTTP][RES]', req.method, req.urlWithParams, `in ${elapsed} ms`, event);
      },
      error: (error) => {
        const elapsed = Math.round(performance.now() - started);
        console.error('[HTTP][ERR]', req.method, req.urlWithParams, `in ${elapsed} ms`, error);
      }
    })
  );
};

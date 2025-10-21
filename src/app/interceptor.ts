import { HttpInterceptorFn } from '@angular/common/http';
import { authToken_TMDB} from './environment/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isMyBackend = req.url.startsWith('http://localhost:3001');

  if (isMyBackend) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: authToken_TMDB,
      Accept: 'application/json',
    },
  });

  return next(cloned);
};

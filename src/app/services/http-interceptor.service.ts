import { HttpInterceptor } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
private encryptService = inject(EncryptService)
  intercept(req: any, next: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const encryptedToken = this.encryptService.decryptToken(token);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${encryptedToken}`
        }
      });
    }
    return next.handle(req);
  }
}

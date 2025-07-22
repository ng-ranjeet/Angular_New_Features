import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private readonly secretKey = environment.encryptToken;
  constructor() { }
  encrypt(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, this.secretKey);
    return encrypted.toString();
  }
  decrypt(encryptedData: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  hashSHA256(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  hmacSHA256(data: string, key: string): string {
    return CryptoJS.HmacSHA256(data, key).toString();
  }

  encryptToken(token: string): string {
    return this.encrypt(token);
  }
  decryptToken(token: string): string {
    return this.decrypt(token);
  }
  
}

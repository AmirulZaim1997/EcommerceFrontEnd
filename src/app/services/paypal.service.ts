import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private baseUrl = 'http://localhost:8099/paypal';

  constructor(private http: HttpClient) { }

  createPayment(sum: number): Observable<any> {
    const url = `${this.baseUrl}/pay?sum=${sum}`;
    return this.http.post(url, {});
  }

  executePayment(paymentId: string, payerId: string): Observable<any> {
    const url = `${this.baseUrl}/success?paymentId=${paymentId}&PayerID=${payerId}`;
    return this.http.get(url);
  }
}

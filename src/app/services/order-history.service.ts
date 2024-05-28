import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:8099/api/orders';
  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string):Observable<GetResponseOrderHistory>{
    
    //need to build URL based on the customer email
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=amira@test.com`;
   // const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);

  }

  getOrderReceipt(id: any):Observable<GetResponseOrderHistory>{
    
    //need to build URL based on the customer email
    //const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=amira@test.com`;
    const orderHistoryUrl = `${this.orderUrl}/search/findByOrdersIdOrderByDateCreatedDesc?id=3`;
    
    //const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderById?id=${id}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);

  }

  getOrderHistoryStatus(theOrder: number):Observable<OrderHistory>{
    
    //need to build URL based on the customer email
    const orderHistoryUrl = `${this.orderUrl}/2`;
   // const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    return this.httpClient.get<OrderHistory>(orderHistoryUrl);

  }



}


interface GetResponseOrderHistory{
  _embedded: {
    orders: OrderHistory[];
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-manageorder',
  templateUrl: './manageorder.component.html',
  styleUrls: ['./manageorder.component.css']
})
export class ManageorderComponent implements OnInit{
  orderHistoryList: OrderHistory[] = [];

  order:Observable<Response>;
  
  storage: Storage =sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService, private route:Router){}

  ngOnInit(): void {
    this.handelOrderHistory();
    
  }
  handelOrderHistory() {
    //read the user's email from the browser storage
    const theEmail = JSON.parse(this.storage.getItem('orderId'));

    //retrive data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
        data =>{
          this.orderHistoryList = data._embedded.orders;
        }
    );
  }

  updateStatus(){
    
  }
}

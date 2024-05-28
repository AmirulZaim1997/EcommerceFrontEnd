import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  orderHistoryList: OrderHistory[] = [];
  
  storage: Storage =sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService){}

  ngOnInit(): void {
    this.handleOrderReceipt();
  }


  handleOrderReceipt() {
    //read the user's email from the browser storage
    const idOrder = JSON.parse(this.storage.getItem('idOrder'));

    //retrive data from the service
    this.orderHistoryService.getOrderReceipt(idOrder).subscribe(
        data =>{
          this.orderHistoryList = data._embedded.orders;
        }
    );
  }

}

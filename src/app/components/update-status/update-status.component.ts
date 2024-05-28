import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent {

  orderhistory : OrderHistory = new OrderHistory;

  constructor(private orderHistoryService: OrderHistoryService, private route: ActivatedRoute){
    
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(()=>{
      this.handleOrderStatus();
    })
}
  handleOrderStatus() {
    const theOrderId: number = +this.route.snapshot.paramMap.get('id')!;

    this.orderHistoryService.getOrderHistoryStatus(theOrderId).subscribe(
      data =>{
        this.orderhistory=data;
      }
    )
}

}

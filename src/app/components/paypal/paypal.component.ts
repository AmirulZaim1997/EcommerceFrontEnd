import { Component, OnInit } from '@angular/core';
import { PaypalService } from '../../services/paypal.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit{
  isPayPalButtonVisible: boolean = false;

  constructor(private payPalService: PaypalService,private cartService: CartService ) { }

  ngOnInit(): void {
    this.loadPayPalScript();
  }

  loadPayPalScript(): void {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=Ae2HtBR2qQIWQGjRnWI_LAuiyN_smNCtF-y9hALqcTmL_ezQwrBwjjBWwJEV5eBKYwvONfICnxsEeJT2&currency=USD';
    script.onload = () => this.initializePayPalButtons();
    {
      console.log('PayPal script loaded successfully');
    };
    document.body.appendChild(script);
  }

  initializePayPalButtons(): void {
    this.isPayPalButtonVisible = true;
    console.log('Initializing PayPal buttons');
  
    const cartAmount = this.getCartAmount(); // Retrieve cart amount dynamically
    
    if (window['paypal']) {
      window['paypal'].Buttons({
        createOrder: (data, actions) => {
          console.log('Creating order');
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: cartAmount.toFixed(2) // Use cart amount dynamically
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          console.log('Order approved');
          return actions.order.capture().then(details => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            // Call your backend to execute the payment
            this.payPalService.executePayment(data.orderID, data.payerID).subscribe(response => {
              console.log('Payment successful', response);
            });
          });
        },
        onCancel: (data) => {
          console.log('Transaction canceled');
          this.isPayPalButtonVisible = false; // Show the purchase button again if canceled
        },
        onError: (err) => {
          console.error('Error in PayPal button rendering', err);
        }
      }).render('#paypal-button-container');
    } else {
      console.error('PayPal SDK is not loaded');
    }
  }
  // Method to get cart amount from the cart service
  getCartAmount(): number {
    return this.cartService.getTotalAmount();
  }

}

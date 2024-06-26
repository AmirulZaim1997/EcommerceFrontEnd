import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { AbidiShopFormService } from 'src/app/services/abidi-shop-form.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { AbidiShopValidators } from 'src/app/validators/abidi-shop-validators';
import { PaypalService } from '../../services/paypal.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  checkoutFormGroup!: FormGroup;
  totalPrice: number= 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[];
  billingAddressStates: State[];

  storage: Storage = sessionStorage;
isPayPalButtonVisible: any;
  payPalService: any;

  constructor(private formBuilder: FormBuilder,
              private abidiShopFormService: AbidiShopFormService ,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router){}
  
  ngOnInit(): void {

    //read the user's email from the browser storage
    const theEmail = JSON.parse(this.storage.getItem('theEmail'));

    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required , Validators.minLength(2),AbidiShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('',[Validators.required , Validators.minLength(2),AbidiShopValidators.notOnlyWhitespace]),
        email: new FormControl(theEmail,[Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),AbidiShopValidators.notOnlyWhitespace])}),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required ,
             Validators.minLength(2),
             AbidiShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace])
      }),
      // creditCard: this.formBuilder.group({
      //   cardType: new FormControl('',[Validators.required]),
      //   nameOnCard: new FormControl('',[Validators.required ,
      //               Validators.minLength(2),
      //               AbidiShopValidators.notOnlyWhitespace]),
      //   cardNumber: new FormControl('',[Validators.required,AbidiShopValidators.validateCreditCardNumber]),
      //   securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
      //   expirationMonth: [''],
      //   expirationYear: ['']
      // })
    });


    //populate credit card month 
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " +startMonth)

    this.abidiShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data ;
      }
    );
    //populate the credit card years 
      this.abidiShopFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Retrieve credit card years: " +JSON.stringify(data));
          this.creditCardYears = data;
        }
      );

      //populate countries 
       this.abidiShopFormService.getCountries().subscribe(
        data =>{
          console.log("Retrieved countries: " + JSON.stringify(data));
          this.countries = data;
        }
       );

  }
  reviewCartDetails() {
    //subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    //subscribe to cartService.totalQuantity
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName')};
  get lastName(){return this.checkoutFormGroup.get('customer.lastName')};
  get email(){return this.checkoutFormGroup.get('customer.email')};
  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')};
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city')};
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')};
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode')};
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')};

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street')};
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city')};
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state')};
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode')};
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country')};
  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')};
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard')};
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')};
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode')};






  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    
      //bug fix code 
      this.billingAddressStates = this.shippingAddressStates;
    }else{

      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }
  onSubmit(){
    console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
        this.checkoutFormGroup.markAllAsTouched();
        return;
    }

    //set up order 
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //get cart items
    const cartItems = this.cartService.cartItems;

    //create orderItems from cartItems
    //long way
    /*let orderItems: OrderItem[] = [];
    for(let i=0 ;i<cartItems.length;i++){
      orderItems[i] = new OrderItem(cartItems[i]);
    }*/
    //short way
    let orderItems: OrderItem[] = 
      cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    //set up purchase
    let purchase = new Purchase();

    //populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    console.log(shippingState);

    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country= shippingCountry.name;


    //populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));

    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country= billingCountry.name;
    
    //populate purchase - order and order items
    purchase.order = order;
    purchase.orderItems = orderItems;
    


    //call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        //success path
        
        next:  response =>{
          alert(`Your order has been received .\nOrder tracking number: ${response.orderTrackingNumber}`);
          //reset cart 
          this.resetCart();

        },
        //exception path
        error: err =>{
          alert(`There was an error : ${err.message}`);
        }
      }
    )


  }
  resetCart() {
    //reset cart data 
    this.cartService.cartItems = [];
    //send  0 to all subscribers
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    //reset the form 
    this.checkoutFormGroup.reset();

    //navigate back to the products page 
    this.router.navigateByUrl("/products");
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    //if the current year equals the selected year , then start with the current month
    
    let startMonth: number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1 ;
    }
    this.abidiShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data ; 
      }
    );
  }
  

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode}`);
    console.log(`${formGroupName} country name : ${countryName}`);

    this.abidiShopFormService.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data; 
        }

        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );

  }

  loadPayPalScript(): void {
    if (window['paypal']) {
      this.initializePayPalButtons();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=Ae2HtBR2qQIWQGjRnWI_LAuiyN_smNCtF-y9hALqcTmL_ezQwrBwjjBWwJEV5eBKYwvONfICnxsEeJT2&currency=USD';
      script.onload = () => {
        this.initializePayPalButtons();
      };
      document.body.appendChild(script);
    }
  }

  onPurchaseCheckboxChange(event: any): void {
    if (event.target.checked) {
      this.initializePayPalButtons();
    } else {
      this.isPayPalButtonVisible = false;
    }
  }

  initializePayPalButtons(): void {
    if (this.isPayPalButtonVisible) return;

    this.isPayPalButtonVisible = true;
    setTimeout(() => {
      if (window['paypal']) {
        window['paypal'].Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.totalPrice.toFixed(2)
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              this.payPalService.executePayment(data.orderID, data.payerID).subscribe(response => {
                console.log('Payment successful', response);
              });
            });
          },
          onCancel: (data) => {
            this.isPayPalButtonVisible = false;
          },
          onError: (err) => {
            console.error('Error in PayPal button rendering', err);
          }
        }).render('#paypal-button-container');
      } else {
        console.error('PayPal SDK is not loaded');
      }
    }, 0);
  }
}

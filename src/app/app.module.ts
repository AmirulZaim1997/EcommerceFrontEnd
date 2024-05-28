import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import{
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard

}from '@okta/okta-angular'

import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { OrderComponent } from './components/order/order.component';
import { ManageorderComponent } from './components/manageorder/manageorder.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { MatIconModule } from '@angular/material/icon';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any,injector: { get: (arg0: typeof Router) => any; }) =>{
    const router = injector.get(Router);

    //redirect the user to your custom login page
    router.navigate(['/login']);
    console.log("3Xiri")

  }
}, myAppConfig.oidc);
const routes: Routes = [

  {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
  {path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductsDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'receipt', component: ReceiptComponent},

  {path: '', redirectTo:'/dashboard',pathMatch: 'full'},
  {path: '**', redirectTo:'/products',pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductsDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    DashboardComponent,
    SignupComponent,
    OrderComponent,
    ProductListComponent,
    ManageorderComponent,
    ReceiptComponent,
    UpdateStatusComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DemoAngularMaterailModule,
    FormsModule,
    NgbCarouselModule,
    MatIconModule,
  ],
  providers: [ProductService,  { provide: OKTA_CONFIG,useValue: oktaConfig},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

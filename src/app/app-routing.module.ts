import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderComponent } from './components/order/order.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ManageorderComponent } from './components/manageorder/manageorder.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';


const routes: Routes = [
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"order", component:OrderHistoryComponent},
  {path:"product", component:ProductListComponent},
  {path:"manageorder", component:ManageorderComponent},
  {path:"updatestatus", component:UpdateStatusComponent},
 // {path:"category", component:ProductCategoryMenuComponent},
  
  //{ path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
 // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

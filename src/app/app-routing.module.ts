import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path:"",component:HomeComponent
  },

  {
    path:"seller",component:SellerComponent
  },
  {
    path:"sellerhome",component:SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"seller-add-product",
    component:SellerAddProductComponent,
    canActivate: [AuthGuard]

  },
  {
    path:"seller-update-product/:id",
    component:SellerUpdateProductComponent,
    canActivate: [AuthGuard]

  },
  {
    component: SearchComponent,
    path:'search/:query'
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  },
  {
    component:CartPageComponent,
    path:'cart-page'
  },
  {
    component:CheckoutComponent,
    path:'checkout'
  },
  {
    component:MyOrdersComponent,
    path:'my-orders'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { OrderComponent } from './order/order.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductComponent } from './product/product.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'users', component: UserComponent },
  { path: 'products', component: ProductComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'products/add', component: ProductAddComponent },
  { path: 'category/add', component: CategoryAddComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'category/edit/:id', component: CategoryEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

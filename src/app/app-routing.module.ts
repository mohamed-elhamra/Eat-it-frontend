import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'category',
    children: [
      { path: '', component: ListCategoryComponent },
      { path: 'create', component: AddCategoryComponent },
    ],
  },
  {
    path: 'product',
    children: [
      { path: 'create', component: AddProductComponent },
      { path: ':categoryId', component: ListProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

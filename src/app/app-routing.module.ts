import { StatisticsComponent } from './components/statistics/statistics.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { AfterAuthGuard } from './security/after-auth.guard';
import { BeforeAuthGuard } from './security/before-auth.guard';
import { AllProductComponent } from './components/all-product/all-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full',
    canActivate: [BeforeAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [AfterAuthGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'statistics', component: StatisticsComponent },
  {
    path: 'orders',
    component: ManageOrdersComponent,
    canActivate: [BeforeAuthGuard],
  },
  {
    path: 'category',
    canActivate: [BeforeAuthGuard],
    children: [
      { path: '', component: ListCategoryComponent },
      { path: 'create', component: AddCategoryComponent },
      { path: ':categoryId', component: ListProductComponent },
    ],
  },
  {
    path: 'product',
    canActivate: [BeforeAuthGuard],
    children: [
      { path: '', component: AllProductComponent },
      { path: 'create', component: AddProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

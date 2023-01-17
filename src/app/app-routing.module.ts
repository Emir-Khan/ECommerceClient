import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { ProductsComponent } from './ui/components/products/products.component';
import { HeaderComponent } from './ui/layout/components/header/header.component';
import { LayoutComponent as UIComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component:UIComponent,
    children:[
      {path:"",component:ProductsComponent},
      {path:"orders",loadChildren: () => import("./ui/components/orders/orders.module").then(module=> module.OrdersModule)}
    ]
  },
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "user-profile", loadChildren: () => import("./admin/components/user-profile/user-profile.module").then(module => module.UserProfileModule) },
      { path: "table-list", loadChildren: () => import("./admin/components/table-list/table-list.module").then(module => module.TableListModule) },
      { path: "typography", loadChildren: () => import("./admin/components/typography/typography.module").then(module => module.TypographyModule) },
      { path: "notifications", loadChildren: () => import("./admin/components/notification/notification.module").then(module => module.NotificationModule) },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

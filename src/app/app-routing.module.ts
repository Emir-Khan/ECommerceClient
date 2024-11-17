import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';
import { LoginComponent } from './ui/components/login/login.component';
import { ProductsComponent } from './ui/components/products/products.component';
import { RegisterComponent } from './ui/components/register/register.component';
import { LayoutComponent as UIComponent } from './ui/layout/layout.component';
import { UpdatePasswordComponent } from './ui/components/update-password/update-password.component';
import { AdminDashboardGuard } from './guards/admin/admin-dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: UIComponent,
    children: [
      { path: "products", component: ProductsComponent },
      { path: "products/:pageNo", component: ProductsComponent },
      // { path: "orders", loadChildren: () => import("./ui/components/orders/orders.module").then(module => module.OrdersModule) },
    ]
  },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "update-password/:userId/:resetToken", component: UpdatePasswordComponent },
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "user-profile", loadChildren: () => import("./admin/components/user-profile/user-profile.module").then(module => module.UserProfileModule) },
      { path: "table-list", loadChildren: () => import("./admin/components/table-list/table-list.module").then(module => module.TableListModule) },
      { path: "typography", loadChildren: () => import("./admin/components/typography/typography.module").then(module => module.TypographyModule) },
      { path: "notifications", loadChildren: () => import("./admin/components/notification/notification.module").then(module => module.NotificationModule) },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) },
      { path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule) },
      { path: "authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule) },
      { path: "roles", loadChildren: () => import("./admin/components/role/role.module").then(module => module.RoleModule) },
      { path: "users", loadChildren: () => import("./admin/components/users/users.module").then(module => module.UsersModule) },
    ], canActivate: [AuthGuard, AdminDashboardGuard], canActivateChild: [AuthGuard, AdminDashboardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

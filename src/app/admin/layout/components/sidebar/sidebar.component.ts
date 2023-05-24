import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  exact: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin', title: 'Dashboard', icon: 'dashboard', class: '', exact: true },
  { path: '/admin/user-profile', title: 'User Profile', icon: 'person', class: '', exact: true },
  { path: '/admin/table-list', title: 'Table List', icon: 'content_paste', class: '', exact: true },
  { path: '/admin/typography', title: 'Typography', icon: 'library_books', class: '', exact: true },
  { path: '/admin/notifications', title: 'Notifications', icon: 'notifications', class: '', exact: true },
  { path: '/admin/products', title: 'Products', icon: 'shopping_bag', class: '', exact: true },
  { path: '/admin/orders', title: 'Orders', icon: 'shopping_basket', class: '', exact: true },
  { path: '/admin/authorize-menu', title: 'Authorize Menu', icon: 'manage_accounts', class: '', exact: true },
  { path: '/admin/roles', title: 'Roles', icon: 'groups', class: '', exact: true },
  { path: '/admin/users', title: 'Users', icon: 'group', class: '', exact: true },
  { path: '/admin/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro', exact: true },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}

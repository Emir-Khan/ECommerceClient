import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoaderService {

  constructor() { }

  async loadComponent(component: DynamicComponent, viewContainerRef: ViewContainerRef) {
    let _component: any = null;

    switch (component) {
      case DynamicComponent.BasketComponent:
        _component = (await import("../../ui/layout/components/basket/basket.component")).BasketComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component)
  }
}

export enum DynamicComponent {
  BasketComponent
}

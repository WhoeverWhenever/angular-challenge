import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { TagManagerComponent } from './products/tag-manager/tag-manager.component';

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "tag-manager", component: TagManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

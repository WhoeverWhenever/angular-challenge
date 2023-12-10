import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { IProduct, Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<IProduct[]> = this.productService.products$;
  public newProduct: IProduct = new Product("", "", 0, [], "", "");
  public idToDelete: number = 0;
  public filteredTags: string = "";

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.productService.setProducts(products);
      console.log(products);
    })
  }

  public addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(product => {
      this.productService.products.push(product);
      this.newProduct = new Product("", "", 0, [], "", "");
    });
  }

  public deleteProduct(): void {
    this.productService.deleteProduct(Number(this.idToDelete)).subscribe(() => {
      this.productService.setProducts(this.productService.products.filter(p => {
        return p.id !== Number(this.idToDelete)
      }));
      this.idToDelete = 0;
    });
  }

  public goToDetails(id: number): void {
    this.router.navigate(["product", id]);
  }

  public goToTagManager(): void {
    this.router.navigate(["tag-manager"]);
  }

  public filterTags(): void {
    const filteredTags: string[] = this.filteredTags.split(" ");
    this.productService.getProducts().subscribe(products => {
      const filteredProducts: IProduct[] = products.filter((product) => {
        return filteredTags.every(filteredTag => {
          return product.tags.some(tag => tag.name === filteredTag);
        })
      })
      this.productService.setProducts(filteredProducts);
    })
  }

  public reload(): void {
    window.location.reload();
  }

}

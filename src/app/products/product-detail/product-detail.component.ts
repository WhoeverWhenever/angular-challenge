import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from '../product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITag } from '../tag.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product?: IProduct;
  public newProduct: IProduct = new Product("", "", 0, [], "", "");

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getProductById(Number(productId)).subscribe((product) => {
      this.product = product;
    });
  }

  public goBack(): void {
    this.router.navigate(["/"]);
  }

  public deleteCurrentProduct(): void {
    const currentId: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.deleteProduct(Number(currentId)).subscribe({
      next: () => {
        this.productService.setProducts(this.productService.products.filter(p => {
          return p.id !== Number(currentId);
        }));
      }
    });
    this.goBack();
  }

  public updateCurrentProduct(): void {
    const currentId: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.newProduct.tags = [...this.product?.tags as ITag[]];
    const updProduct: IProduct = this.newProduct;
    this.productService.updateProductById(Number(currentId), updProduct).subscribe(() => {
      console.log("Updated!");
    });
    this.goBack();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { IProduct } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL: string = "http://localhost:3000/products";

  private readonly _products$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  public readonly products$ = this._products$.asObservable();

  get products(): IProduct[] {
    return this._products$.getValue();
  }

  private set products(products: IProduct[]) {
    this._products$.next(products);
  }

  public setProducts(products: IProduct[]): void {
    this.products = products;
  }

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiURL).pipe(
      catchError(this.handleError('getProducts', []))
    );
  }

  public addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiURL, product)
      .pipe(
        catchError(this.handleError('addProduct', product))
      );
  }

  public deleteProduct(productId: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.apiURL}/${productId}`)
      .pipe(
        catchError(this.handleError<IProduct>('deleteProduct'))
      );
  }

  public getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiURL}/${productId}`)
      .pipe(
        catchError(this.handleError<IProduct>('getProductById'))
      );
  }

  public updateProductById(productId: number, updProduct: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiURL}/${productId}`, updProduct)
      .pipe(
        catchError(this.handleError<IProduct>('updateProduct'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

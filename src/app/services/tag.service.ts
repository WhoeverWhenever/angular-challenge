import { Injectable } from '@angular/core';
import { ITag } from '../products/tag.model';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {


  private tagURL: string = "http://localhost:3000/tags";
  private productURL: string = "http://localhost:3000/products";

  private readonly _tags$: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public readonly tags$ = this._tags$.asObservable();

  get tags(): ITag[] {
    return this._tags$.getValue();
  }

  private set tags(tags: ITag[]) {
    this._tags$.next(tags);
  }

  public setTags(tags: ITag[]): void {
    this.tags = tags;
  }

  constructor(private http: HttpClient) { }

  public getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.tagURL).pipe(
      catchError(this.handleError('getTags', []))
    );
  }

  public addTag(tag: ITag): Observable<ITag> {
    return this.http.post<ITag>(this.tagURL, tag)
      .pipe(catchError(this.handleError("addTag", tag)));
  }

  public deleteTag(tagId: number): Observable<ITag> {
    return this.http.delete<ITag>(`${this.tagURL}/${tagId}`)
      .pipe(catchError(this.handleError<ITag>("deleteTag")));
  }

  public editTag(tagId: number, updTag: ITag): Observable<ITag> {
    return this.http.put<ITag>(`${this.tagURL}/${tagId}`, updTag)
      .pipe(catchError(this.handleError<ITag>("editTag")));
  }

  public assignTag(productId: number, tag: ITag): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.productURL}/${productId}`, tag)
      .pipe(catchError(this.handleError<IProduct>("assignTag")));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

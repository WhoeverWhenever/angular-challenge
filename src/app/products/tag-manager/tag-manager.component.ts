import { Component } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ITag, Tag } from '../tag.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from '../product.model';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss']
})
export class TagManagerComponent {

  public tags$: Observable<ITag[]> = this.tagService.tags$;
  public newTag: ITag = new Tag("", "");
  public updTag: ITag = new Tag("", "");
  public idToEdit: number = 0;
  public productId: number = 0;


  constructor(
    private tagService: TagService,
    private productService: ProductService,
    private router: Router
  ) { }

  public getTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tagService.setTags(tags);
      console.log(tags);
    });
  }

  public addTag(): void {
    this.tagService.addTag(this.newTag).subscribe((tag) => {
      this.tagService.tags.push(tag);
      this.newTag = new Tag("", "");
    });
  }

  public deleteTag(tagId: number): void {
    this.tagService.deleteTag(tagId).subscribe(() => {
      this.tagService.setTags(this.tagService.tags.filter(tag => tag.id !== tagId));
    })
  }

  public editTag(): void {
    const updTag: ITag = this.updTag;
    this.tagService.editTag(Number(this.idToEdit), updTag).subscribe(() => { console.log("Updated!") });
    this.getTags();
    this.idToEdit = 0;
    this.updTag = new Tag("", "");
  }

  public assignTag(tagId: number): void {
    const currentTag: ITag = this.tagService.tags.find(tag => tag.id === tagId) as ITag;
    this.productService.getProductById(Number(this.productId)).subscribe((product) => {
      product.tags.push(currentTag);
      this.productService.updateProductById(Number(this.productId), product).subscribe(() => {
      })
    });
  }


  public goBack(): void {
    this.router.navigate(["/"]);
  }

}

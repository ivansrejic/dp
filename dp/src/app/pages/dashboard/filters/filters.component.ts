import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  @Output() showBrand = new EventEmitter<string>();
  @Input() categories: Array<string> | undefined;
  @Input() brands: Array<string> | undefined;

  categoryFilter: string | undefined;
  brandFilter: string | undefined;

  constructor() {}
  ngOnInit(): void {
    console.log(this.categories);
  }

  ngOnChanges(): void {
    console.log('Categories updated:', this.categories);
  }

  onShowCategory(category: string): void {
    this.categoryFilter = category;
    this.showCategory.emit(this.categoryFilter);
  }
  onShowBrand(brand: string): void {
    this.brandFilter = brand;
    this.showBrand.emit(this.brandFilter);
  }

  removeCategoryFilter() {
    this.categoryFilter = undefined;
    this.showCategory.emit(this.categoryFilter);
  }
  removeBrandFilter() {
    this.brandFilter = undefined;
    this.showBrand.emit(this.brandFilter);
  }
}

import { Component, OnInit, OnDestroy, signal, WritableSignal, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, combineLatest, startWith, debounceTime, takeUntil, switchMap } from 'rxjs';
import { MatSliderModule } from "@angular/material/slider";
import { CoreService } from '../services/core.service';
import { Products } from '../models/product.model';

@Component({
  selector: 'app-products', // Changed selector to app-products as per your code
  standalone: true, // Ensure standalone is true
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss' // Changed styleUrl as per your code
})
export class ProductsComponent implements OnInit, OnDestroy {
  // Dummy Data (replace with API calls in a real application)
  private allProducts: Products[] = [];

  // Filters and Search controls
  searchControl = new FormControl('');
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  priceRange: WritableSignal<number> = signal(1000); // Max price in dummy data
  minRating: WritableSignal<number> = signal(0); // Minimum rating filter

  sortOption = new FormControl('relevance');

  // Pagination properties
  pageSize = 10;
  pageIndex = 0;
  totalProducts = 0;

  // Signals for filtered and displayed products
  filteredProducts: WritableSignal<Products[]> = signal([]);
  displayedProducts: WritableSignal<Products[]> = signal([]);

  // Available filter options (dynamically generated from allProducts)
  availableCategories: string[] = [];
  availableBrands: string[] = [];
  maxPrice: number = 0;

  private destroy$ = new Subject<void>();
  isLoading: WritableSignal<boolean> = signal(false);
  coreService = inject(CoreService)

  ngOnInit(): void {
    this.extractFilterOptions();
    this.applyFiltersAndPagination();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private extractFilterOptions(): void {
    const categories = new Set<string>();
    const brands = new Set<string>();
    this.coreService.getProductFilters().subscribe({
      next: (data) => {
        data.categories.forEach((category) => categories.add(category));
        data.brands.forEach((brand) => brands.add(brand));
        this.availableCategories = Array.from(categories).sort();
        this.availableBrands = Array.from(brands).sort();
      },
      error: (err) => {
        console.log(err)
      },
    });
    // this.maxPrice = highestPrice;
    // this.priceRange.set(highestPrice); // Set initial max price for slider
  }

  private setupFiltersAndSearch(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value), debounceTime(600)),
      this.sortOption.valueChanges.pipe(startWith(this.sortOption.value)),
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.pageIndex = 0; // Reset page on filter/search/sort change
      this.applyFiltersAndPagination();
    });
  }

  applyFiltersAndPagination(): void {
    this.isLoading.set(true); // Show loading spinner
    let filterData: any = {};

    // Collect search term
    const searchTerm = this.searchControl.value?.toLowerCase().trim();
    if (searchTerm) {
      filterData.name = searchTerm;
    }

    // Collect price range
    const price = this.priceRange(); // assuming signal
    if (price > 0) {
      filterData.max = price; // max price
      filterData.min = 0;     // min price (adjust if needed)
    }

    // Collect rating
    const rating = this.minRating(); // assuming signal
    if (rating > 0) {
      filterData.rating = rating;
    }
    // categories
    if (this.selectedCategories.length > 0) {
      filterData.categories = this.selectedCategories.join(',');
    }
    // brands
    if (this.selectedBrands.length > 0) {
      filterData.brands = this.selectedBrands.join(',');
    }
    // apply pagination 
      filterData.page = this.pageIndex + 1;
      filterData.limit = this.pageSize;
    this.coreService.getProducts(filterData).subscribe({
      next: (data) => {
        this.allProducts = data.products;
        this.totalProducts = data.totalResults;
        this.filteredProducts.set(this.allProducts);
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.displayedProducts.set(this.filteredProducts().slice(startIndex, endIndex));
      },
      error: (err) => {
        console.log(err)
      },
    })
    // // Simulate network delay
    // setTimeout(() => {
    //   let currentProducts = [...this.allProducts];

    //   // 1. Apply Search Term
    //   const searchTerm = this.searchControl.value?.toLowerCase().trim();
    //   if (searchTerm) {
    //     currentProducts = currentProducts.filter(product =>
    //       product.name.toLowerCase().includes(searchTerm) ||
    //       product.brand.toLowerCase().includes(searchTerm) ||
    //       product.category.toLowerCase().includes(searchTerm)
    //     );
    //   }

    //   // 2. Apply Category Filters
    //   if (this.selectedCategories.length > 0) {
    //     currentProducts = currentProducts.filter(product =>
    //       this.selectedCategories.includes(product.category)
    //     );
    //   }

    //   // 3. Apply Brand Filters
    //   if (this.selectedBrands.length > 0) {
    //     currentProducts = currentProducts.filter(product =>
    //       this.selectedBrands.includes(product.brand)
    //     );
    //   }

    //   // 4. Apply Price Range Filter
    //   currentProducts = currentProducts.filter(product =>
    //     product.price <= this.priceRange()
    //   );

    //   // 5. Apply Rating Filter
    //   currentProducts = currentProducts.filter(product =>
    //     product.rating >= this.minRating()
    //   );


    //   // 6. Apply Sorting
    //   const sortBy = this.sortOption.value;
    //   switch (sortBy) {
    //     case 'price-asc':
    //       currentProducts.sort((a, b) => a.price - b.price);
    //       break;
    //     case 'price-desc':
    //       currentProducts.sort((a, b) => b.price - a.price);
    //       break;
    //     case 'rating-desc':
    //       currentProducts.sort((a, b) => b.rating - a.rating);
    //       break;
    //     case 'name-asc':
    //       currentProducts.sort((a, b) => a.name.localeCompare(b.name));
    //       break;
    //     // 'relevance' is default/no-op after other filters
    //   }

    //   this.filteredProducts.set(currentProducts);
    //   this.totalProducts = this.filteredProducts().length;

    //   // 7. Apply Pagination
    //   const startIndex = this.pageIndex * this.pageSize;
    //   const endIndex = startIndex + this.pageSize;
    //   this.displayedProducts.set(this.filteredProducts().slice(startIndex, endIndex));
    //   console.log(this.displayedProducts())
    //   this.isLoading.set(false); // Hide loading spinner
    // }, 500); // Simulate API call delay
    this.isLoading.set(false);
  }

  onCategoryChange(event: MatSelectionListChange) {
    const changedOption = event.options[0];
    const category = changedOption.value;

    if (changedOption.selected) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }

    this.pageIndex = 0;
    this.applyFiltersAndPagination();
  }

  // Corrected: Receive the number directly from $event.value
  onBrandChange(event: MatSelectionListChange): void {
    const changedOption = event.options[0];
    const brand = changedOption.value;

    if (changedOption.selected) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(c => c !== brand);
    }

    this.pageIndex = 0;
    this.applyFiltersAndPagination();
  }

  // Corrected: Receive the number directly from $event.value
  onPriceSliderChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.priceRange.set(Number(input?.value));
      this.pageIndex = 0;
      this.applyFiltersAndPagination();
    }
  }

  // Corrected: Receive the number directly from $event.value
  onRatingSliderChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.minRating.set(Number(input?.value));
      this.pageIndex = 0;
      this.applyFiltersAndPagination();
    }
  }

  clearAllFilters(): void {
    this.searchControl.setValue('');
    this.selectedCategories = [];
    this.selectedBrands = [];
    this.priceRange.set(this.maxPrice);
    this.minRating.set(0);
    this.sortOption.setValue('relevance');
    this.pageIndex = 0;
    this.applyFiltersAndPagination();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.applyFiltersAndPagination();
  }

  // For responsive sidebar on smaller screens
  sidenavOpened: boolean = true; // Start opened on desktop, can be toggled
  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
import { Component, OnInit, OnDestroy, Input, signal, WritableSignal, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

// Reusing the Product interface from the list component
interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  imageUrl: string;
  description: string;
  specifications: { [key: string]: string };
  reviews: { user: string; rating: number; comment: string }[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() productId: number | undefined; // Input to receive product ID

  product: WritableSignal<Product | null> = signal(null);
  isLoading: WritableSignal<boolean> = signal(true);

  private destroy$ = new Subject<void>();
   quantity: number = 1; // Default quantity for purchase

  private router = inject(Router); // Inject Router

  @ViewChild('productTabs') productTabs!: MatTabGroup; // Access the MatTabGroup

  // Dummy Data for demonstration (replace with actual API call)
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      brand: 'AudioTech',
      price: 120,
      rating: 4.5,
      imageUrl: 'https://via.placeholder.com/400x300?text=Headphones+Pro',
      description: 'Experience immersive sound with these comfortable, noise-cancelling wireless headphones. Perfect for music lovers and professionals alike. Features include long battery life, quick charging, and crystal-clear audio quality.',
      specifications: {
        'Connectivity': 'Bluetooth 5.2',
        'Battery Life': 'Up to 30 hours',
        'Charging Time': '2 hours',
        'Noise Cancellation': 'Active',
        'Weight': '250g'
      },
      reviews: [
        { user: 'Alice W.', rating: 5, comment: 'Amazing sound quality and super comfortable!' },
        { user: 'Bob S.', rating: 4, comment: 'Great headphones, battery life is impressive. Minor issue with fit.' }
      ]
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      category: 'Home & Office',
      brand: 'ComfortSeat',
      price: 250,
      rating: 4.8,
      imageUrl: 'https://via.placeholder.com/400x300?text=Ergonomic+Chair',
      description: 'Designed for ultimate comfort and support during long working hours. This ergonomic office chair features adjustable lumbar support, armrests, and headrest, ensuring a healthy posture and reduced back strain.',
      specifications: {
        'Material': 'Mesh & Fabric',
        'Adjustments': 'Height, Lumbar, Armrest, Tilt',
        'Weight Capacity': '150 kg',
        'Assembly': 'Required (Easy)'
      },
      reviews: [
        { user: 'Charlie D.', rating: 5, comment: 'Best office chair I\'ve ever owned. My back feels so much better!' },
        { user: 'Diana P.', rating: 5, comment: 'Very comfortable and easy to assemble. Highly recommend.' },
        { user: 'Eve L.', rating: 4, comment: 'Good chair, but a bit pricey. Worth it for the comfort.' }
      ]
    },
    {
      id: 3,
      name: 'Stainless Steel Water Bottle',
      category: 'Kitchen',
      brand: 'HydroFlask',
      price: 25,
      rating: 4.2,
      imageUrl: 'https://via.placeholder.com/400x300?text=Water+Bottle',
      description: 'Keep your drinks cold for 24 hours or hot for 12 hours with this durable double-walled vacuum insulated stainless steel water bottle. Perfect for gym, office, or outdoor adventures.',
      specifications: {
        'Capacity': '750ml',
        'Material': 'Food-grade Stainless Steel',
        'Insulation': 'Double-walled Vacuum',
        'Leak-proof': 'Yes'
      },
      reviews: [
        { user: 'Frank G.', rating: 4, comment: 'Keeps water cold all day. A bit heavy when full.' },
        { user: 'Grace H.', rating: 5, comment: 'Fantastic bottle, never leaks and looks great.' }
      ]
    },
    // Add more mock products as needed for testing different IDs
  ];

  ngOnInit(): void {
    this.loadProductDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProductDetails(): void {
    this.isLoading.set(true);
    // Simulate API call delay
    setTimeout(() => {
      if (this.productId) {
        const foundProduct = this.mockProducts.find(p => p.id === this.productId);
        this.product.set(foundProduct || null);
      } else {
        // If no product ID is provided, default to the first product for demonstration
        this.product.set(this.mockProducts[0] || null);
      }
      this.isLoading.set(false);
    }, 700);
  }
   updateQuantity(delta: number): void {
    const newQuantity = this.quantity + delta;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
    }
  }

  onQuantityChange(): void {
    // Ensure quantity is at least 1
    if (this.quantity < 1 || isNaN(this.quantity)) {
      this.quantity = 1;
    }
  }

  addToCart(): void {
    if (this.product()) {
      console.log(`Added ${this.product()?.name} to cart!`);
      // Implement actual add to cart logic here
      alert(`${this.product()?.name} added to cart! (Using alert for demo)`);
    }
  }

  buyNow(): void {
    if (this.product()) {
      console.log(`Buying ${this.product()?.name} now!`);
      // Implement actual buy now logic here
      alert(`Proceeding to checkout for ${this.product()?.name}! (Using alert for demo)`);
    }
  }

  // Helper to go back (e.g., to product list)
  goBack(): void {
    const router = inject(Router);
    router.navigate(['/products']);
  }
  productKeys(obj: any): string[] {
  return Object.keys(obj);
}
goToReviewsTab(): void {
    if (this.productTabs) {
      this.productTabs.selectedIndex = 2; // Index of the Reviews tab
    }
  }
}
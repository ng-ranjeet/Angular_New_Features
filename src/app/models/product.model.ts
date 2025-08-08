export interface ProductResponse {
   products: Products[],
   results:  number,
   totalResults: number,
   totalPages: number,
   currentPage: number
}

export interface Products {
    _id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    image: string;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRanges: string[];
  ratings: number[];
  min_max_price: {
    min: {price: number};
    max: {price: number};
  };
}
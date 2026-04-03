export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors?: ProductColor[];
  specifications?: Record<string, string>;
  features?: string[];
  tags?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  image?: string;
}

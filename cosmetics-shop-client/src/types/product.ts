interface AvailableShade {
  name: string;
  color: string;
  image: string;
}

interface ProductImage {
  title?: string | null;
  image?: string | null;
}

interface BrandInfo {
  founded?: number;
  followers?: string;
  locations?: string;
  orders?: string;
}

interface Certifications {
  authentic?: string;
  shipping?: string;
  payment?: string;
}

export interface Product {
  name: string;
  price: number;
  currency: string;
  pointsEarned: number;
  shade?: string;
  availableShades: AvailableShade[];
  productImage: ProductImage[];
  description: string;
  features: string[];
  ingredients: string[];
  countryOfOrigin: string;
  manufacturer: string;
  addressOfManufacturer: string;
  howToUse?: string;
  shelfLife?: string;
  productCode?: string;
  quantity: number;
  brand?: string;
  mainCategoryId?: string;
  categoryId?: string;
  subCategoryId: string;
  brandInfo?: BrandInfo;
  certifications?: Certifications;
  isFeatured: "Yes" | "No";
  isPublished: "Yes" | "No";
  createdAt: Date;
  updatedAt: Date;
}

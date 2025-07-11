import { Product } from "./product";

export interface Shade {
  name: string;
  color: string;
  image: string;
}

// interface BrandInfo {
//   founded: number;
//   followers: string;
//   locations: string;
//   orders: string;
// }

// interface Certifications {
//   authentic: string;
//   shipping: string;
//   payment: string;
// }

export interface CartItem {
  _id: string;
  price: number;
  quantity: number;
  cartQuantity: number;
  singleCartTotal: number;
  selectedShade: Shade;
  product: Product;
  //   brand_info: BrandInfo;
  //   certifications: Certifications;
}

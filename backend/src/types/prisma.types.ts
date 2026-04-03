import {
  Prisma,
  Cart,
  CartItem,
  Product,
  Category,
  Color,
  OrderItem,
} from "@prisma/client";

export type CartWithTotal = Cart & {
  total: number;
  items: (CartItem & {
    product: Product & {
      category: Category;
      colors: Color[];
    };
    color: Color | null;
  })[];
};

export type ProductWithDetails = Product & {
  category: Category;
  colors: Color[];
};

// Export Prisma types for where/orderBy
// Removed invalid Prisma type exports - use Prisma.ProductWhereInput directly

// HttpException response type
export interface HttpExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
}

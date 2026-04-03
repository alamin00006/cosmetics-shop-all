import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { GetProductsDto } from "./dto";

const productInclude = {
  category: true,
  colors: true,
} as const;

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts(dto: GetProductsDto) {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      brands,
      search,
      sort,
    } = dto;

    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = { name: { equals: category, mode: "insensitive" } };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (brands?.length) {
      where.brand = { in: brands };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "name-asc") orderBy = { name: "asc" };
    else if (sort === "name-desc") orderBy = { name: "desc" };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: productInclude,
        orderBy,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: productInclude,
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product;
  }

  async getFeaturedProducts() {
    return this.prisma.product.findMany({
      where: { isBestseller: true },
      take: 8,
      include: productInclude,
    });
  }

  async getNewArrivals() {
    return this.prisma.product.findMany({
      where: { isNew: true },
      take: 8,
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  async searchProducts(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      include: productInclude,
    });
  }

  async getProductsByCategory(category: string) {
    return this.prisma.product.findMany({
      where: {
        category: { name: { equals: category, mode: "insensitive" } },
      },
      include: productInclude,
    });
  }
}

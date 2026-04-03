import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import {
  GetProductsDto,
  CreateProductDto,
  UpdateProductDto,
  GetOrdersDto,
  UpdateOrderStatusDto,
  GetUsersDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  SalesAnalyticsDto,
} from "./dto";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // ========== Dashboard Stats ==========
  async getDashboardStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [totalRevenue, totalOrders, totalProducts, totalUsers] =
      await Promise.all([
        this.prisma.order.aggregate({ _sum: { totalAmount: true } }),
        this.prisma.order.count(),
        this.prisma.product.count(),
        this.prisma.user.count(),
      ]);

    const [lastMonthRevenue, lastMonthOrders] = await Promise.all([
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      }),
      this.prisma.order.count({
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      }),
    ]);

    const [currentMonthRevenue, currentMonthOrders] = await Promise.all([
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { createdAt: { gte: startOfMonth } },
      }),
      this.prisma.order.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
    ]);

    const revenueGrowth =
      (lastMonthRevenue._sum.totalAmount ?? 0) > 0
        ? (((currentMonthRevenue._sum.totalAmount ?? 0) -
            (lastMonthRevenue._sum.totalAmount ?? 0)) /
            (lastMonthRevenue._sum.totalAmount ?? 0)) *
          100
        : 0;
    const ordersGrowth = lastMonthOrders
      ? ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100
      : 0;

    const recentOrders = await this.prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            product: { include: { category: true, colors: true } },
            color: true,
          },
        },
        // shippingAddress: true,
      },
    });

    const topProductsData = await this.prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    const topProducts = await Promise.all(
      topProductsData.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          include: { category: true, colors: true },
        });
        return { product, soldCount: item._sum.quantity || 0 };
      }),
    );

    const salesByMonth = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const [monthRevenue, monthOrders] = await Promise.all([
        this.prisma.order.aggregate({
          _sum: { totalAmount: true },
          where: { createdAt: { gte: monthStart, lte: monthEnd } },
        }),

        this.prisma.order.count({
          where: { createdAt: { gte: monthStart, lte: monthEnd } },
        }),
      ]);

      salesByMonth.push({
        month: monthStart.toLocaleString("default", { month: "short" }),
        revenue: monthRevenue._sum.totalAmount || 0,
        orders: monthOrders,
      });
    }

    return {
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalOrders,
      totalProducts,
      totalUsers,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      ordersGrowth: Math.round(ordersGrowth * 10) / 10,
      recentOrders,
      topProducts: topProducts.filter((p) => p.product),
      salesByMonth,
    };
  }

  // ========== Sales Analytics ==========
  async getSalesAnalytics(dto: SalesAnalyticsDto) {
    const {
      startDate,
      endDate,
      compareStartDate,
      compareEndDate,
      groupBy = "day",
    } = dto;

    if (!startDate || !endDate) {
      throw new BadRequestException("startDate and endDate are required");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const orders = await this.prisma.order.findMany({
      where: { createdAt: { gte: start, lte: end } as Prisma.DateTimeFilter },
      include: {
        items: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
    });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const uniqueCustomers = new Set(orders.map((o) => o.userId));
    const totalCustomers = uniqueCustomers.size;

    // Comparison period
    let comparison = undefined;
    if (compareStartDate && compareEndDate) {
      const compStart = new Date(compareStartDate);
      const compEnd = new Date(compareEndDate);
      compEnd.setHours(23, 59, 59, 999);

      const compOrders = await this.prisma.order.findMany({
        where: {
          createdAt: { gte: compStart, lte: compEnd } as Prisma.DateTimeFilter,
        },
      });

      const previousRevenue = compOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0,
      );
      const previousOrders = compOrders.length;
      const previousAov =
        previousOrders > 0 ? previousRevenue / previousOrders : 0;
      const previousCustomers = new Set(compOrders.map((o) => o.userId)).size;

      comparison = {
        revenueChange:
          previousRevenue > 0
            ? ((totalRevenue - previousRevenue) / previousRevenue) * 100
            : 0,
        ordersChange:
          previousOrders > 0
            ? ((totalOrders - previousOrders) / previousOrders) * 100
            : 0,
        aovChange:
          previousAov > 0
            ? ((averageOrderValue - previousAov) / previousAov) * 100
            : 0,
        customersChange:
          previousCustomers > 0
            ? ((totalCustomers - previousCustomers) / previousCustomers) * 100
            : 0,
        previousRevenue,
        previousOrders,
        previousAov,
        previousCustomers,
      };
    }

    // Sales over time
    const salesMap = new Map<
      string,
      { revenue: number; orders: number; aov: number }
    >();
    orders.forEach((order) => {
      let key: string;
      const date = new Date(order.createdAt);

      if (groupBy === "month") {
        key = date.toISOString().slice(0, 7);
      } else if (groupBy === "week") {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().slice(0, 10);
      } else {
        key = date.toISOString().slice(0, 10);
      }

      const existing = salesMap.get(key) || { revenue: 0, orders: 0, aov: 0 };
      existing.revenue += order.totalAmount;
      existing.orders += 1;
      existing.aov = existing.revenue / existing.orders;
      salesMap.set(key, existing);
    });

    const salesOverTime = Array.from(salesMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        revenue: Math.round(data.revenue * 100) / 100,
        orders: data.orders,
        averageOrderValue: Math.round(data.aov * 100) / 100,
      }));

    // Sales by category
    const categoryMap = new Map<
      string,
      {
        categoryId: string;
        categoryName: string;
        revenue: number;
        orders: number;
      }
    >();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const cat = item.product.category;
        const existing = categoryMap.get(cat.id) || {
          categoryId: cat.id,
          categoryName: cat.name,
          revenue: 0,
          orders: 0,
        };
        existing.revenue += item.price * item.quantity;
        categoryMap.set(cat.id, existing);
      });
    });

    const ordersByCategory = new Map<string, Set<string>>();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const catId = item.product.categoryId;
        if (!ordersByCategory.has(catId)) {
          ordersByCategory.set(catId, new Set());
        }
        ordersByCategory.get(catId)!.add(order.id);
      });
    });

    const salesByCategory = Array.from(categoryMap.values())
      .map((cat) => ({
        ...cat,
        orders: ordersByCategory.get(cat.categoryId)?.size || 0,
        percentage: totalRevenue > 0 ? (cat.revenue / totalRevenue) * 100 : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Top products
    const productMap = new Map<
      string,
      {
        productId: string;
        productName: string;
        productImage: string;
        brand: string;
        unitsSold: number;
        revenue: number;
      }
    >();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const prod = item.product;
        const existing = productMap.get(prod.id) || {
          productId: prod.id,
          productName: prod.name,
          productImage: prod.image ?? "",
          brand: prod.brand ?? "",
          unitsSold: 0,
          revenue: 0,
        };

        existing.unitsSold += item.quantity;
        existing.revenue += item.price * item.quantity;
        productMap.set(prod.id, existing);
      });
    });

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Order status breakdown
    const statusCounts = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const orderStatusBreakdown = Object.entries(statusCounts).map(
      ([status, count]) => ({
        status,
        count,
        percentage: totalOrders > 0 ? (count / totalOrders) * 100 : 0,
      }),
    );

    return {
      summary: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalOrders,
        averageOrderValue: Math.round(averageOrderValue * 100) / 100,
        totalCustomers,
      },
      comparison,
      salesOverTime,
      salesByCategory,
      topProducts,
      orderStatusBreakdown,
    };
  }

  // ========== Products ==========
  async getProducts(dto: GetProductsDto) {
    const { page = 1, limit = 10, search } = dto;

    const where: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { brand: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { category: true, colors: true },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async createProduct(dto: CreateProductDto) {
    const { colors, ...productData } = dto;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        id: undefined,
        images: productData.images || [],
        tags: productData.features || [],
        colors: colors ? { create: colors } : undefined,
      } as any,
      include: { category: true, colors: true },
    });

    await this.prisma.category.update({
      where: { id: dto.categoryId },
      data: { productCount: { increment: 1 } },
    });

    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const { colors, ...productData } = dto;

    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Product not found");

    if (colors) {
      // Color management handled by nested create/update
    }

    return this.prisma.product.update({
      where: { id },
      data: productData,
      include: { category: true, colors: true },
    });
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException("Product not found");

    await this.prisma.product.delete({ where: { id } });

    await this.prisma.category.update({
      where: { id: product.categoryId },
      data: { productCount: { decrement: 1 } },
    });
  }

  // ========== Orders ==========
  async getOrders(dto: GetOrdersDto) {
    const { page = 1, limit = 10, status } = dto;

    const where: Prisma.OrderWhereInput = status ? { status } : {};

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: {
            include: {
              product: { include: { category: true, colors: true } },
              color: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),

      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateOrderStatus(id: string, dto: UpdateOrderStatusDto) {
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(dto.status)) {
      throw new BadRequestException("Invalid status");
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            product: { include: { category: true, colors: true } },
            color: true,
          },
        },
      },
    });
  }

  // ========== Users ==========
  async getUsers(dto: GetUsersDto) {
    const { page = 1, limit = 10, search } = dto;

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { orders: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ========== Categories ==========
  async getCategories() {
    return this.prisma.category.findMany({
      include: { subcategories: true },
      orderBy: { name: "asc" },
    });
  }

  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...dto,
        id: undefined,
      } as any,
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCategory(id: string) {
    const productsCount = await this.prisma.product.count({
      where: { categoryId: id },
    });
    if (productsCount > 0) {
      throw new BadRequestException("Cannot delete category with products");
    }

    await this.prisma.category.delete({ where: { id } });
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto";

const orderInclude = {
  items: {
    include: {
      product: { include: { category: true, colors: true } },
      color: true,
    },
  },
  shippingAddress: true,
};

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: orderInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  async getOrderById(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: orderInclude,
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }

  async createOrder(userId: string, dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: true, color: true } },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException("Cart is empty");
    }

    const address = await this.prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    });

    if (!address) {
      throw new NotFoundException("Address not found");
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const shipping = 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const order = await this.prisma.order.create({
      data: {
        userId,
        status: "pending",
        totalAmount: total,
        shippingAddress: {
          name: address.name,
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
        } as any,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            colorId: item.colorId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: orderInclude,
    });

    // Clear cart
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    if (!["pending", "processing"].includes(order.status)) {
      throw new BadRequestException("Cannot cancel this order");
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: "cancelled" },
      include: orderInclude,
    });
  }
}

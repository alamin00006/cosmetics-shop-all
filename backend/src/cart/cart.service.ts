import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Cart, CartItem } from "@prisma/client";
import { AddItemDto, UpdateItemDto } from "./dto";
import type { CartWithTotal } from "../types/prisma.types";

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string): Promise<CartWithTotal> {
    let cart = (await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: { include: { category: true, colors: true } },
            color: true,
          },
        },
      },
    })) as CartWithTotal | null;

    if (!cart) {
      cart = (await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: { include: { category: true, colors: true } },
              color: true,
            },
          },
        },
      })) as CartWithTotal;
    }

    const total = cart.items.reduce<number>(
      (sum, item) => sum + (item.product.price as number) * item.quantity,
      0,
    );

    return { ...cart, total, items: cart.items };
  }

  async addItem(userId: string, dto: AddItemDto): Promise<CartWithTotal> {
    const cart = await this.getOrCreateCart(userId);

    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const colorId = dto.colorId ? parseInt(dto.colorId, 10) : null;
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId_colorId:
          colorId !== null
            ? {
                cartId: cart.id,
                productId: dto.productId,
                colorId,
              }
            : undefined,
      },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (dto.quantity || 1) },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          colorId,
          quantity: dto.quantity || 1,
        },
      });
    }

    return this.getCart(userId);
  }

  async updateItem(
    userId: string,
    itemId: string,
    dto: UpdateItemDto,
  ): Promise<CartWithTotal> {
    const cart = await this.getOrCreateCart(userId);

    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });

    if (!item) {
      throw new NotFoundException("Cart item not found");
    }

    if (dto.quantity <= 0) {
      await this.prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      await this.prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity: dto.quantity },
      });
    }

    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string): Promise<CartWithTotal> {
    const cart = await this.getOrCreateCart(userId);

    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });

    if (!item) {
      throw new NotFoundException("Cart item not found");
    }

    await this.prisma.cartItem.delete({ where: { id: itemId } });

    return this.getCart(userId);
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.getOrCreateCart(userId);
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  private async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }
    return cart;
  }
}

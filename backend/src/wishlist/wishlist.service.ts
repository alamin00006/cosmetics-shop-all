import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string) {
    const items = await this.prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          include: { category: true, colors: true },
        },
      },
      orderBy: { addedAt: 'desc' },
    });

    return items.map((item) => ({
      id: item.id,
      product: item.product,
      addedAt: item.addedAt.toISOString(),
    }));
  }

  async addToWishlist(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existing = await this.prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      throw new ConflictException('Product already in wishlist');
    }

    const item = await this.prisma.wishlistItem.create({
      data: { userId, productId },
      include: {
        product: { include: { category: true, colors: true } },
      },
    });

    return {
      id: item.id,
      product: item.product,
      addedAt: item.addedAt.toISOString(),
    };
  }

  async removeFromWishlist(userId: string, productId: string) {
    const item = await this.prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (!item) {
      throw new NotFoundException('Item not in wishlist');
    }

    await this.prisma.wishlistItem.delete({ where: { id: item.id } });
  }
}

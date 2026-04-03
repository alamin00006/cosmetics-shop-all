import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAddressDto, UpdateAddressDto } from "./dto";

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  }

  async createAddress(userId: string, dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const existingCount = await this.prisma.address.count({
      where: { userId },
    });

    return this.prisma.address.create({
      data: {
        userId,
        isDefault: dto.isDefault || existingCount === 0,
        ...(dto as any),
      },
    } as any);
  }

  async updateAddress(userId: string, id: string, dto: UpdateAddressDto) {
    const address = await this.prisma.address.findFirst({
      where: { id, userId },
    });

    if (!address) {
      throw new NotFoundException("Address not found");
    }

    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.update({
      where: { id },
      data: dto,
    });
  }

  async deleteAddress(userId: string, id: string) {
    const address = await this.prisma.address.findFirst({
      where: { id, userId },
    });

    if (!address) {
      throw new NotFoundException("Address not found");
    }

    await this.prisma.address.delete({ where: { id } });

    if (address.isDefault) {
      const remaining = await this.prisma.address.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      if (remaining) {
        await this.prisma.address.update({
          where: { id: remaining.id },
          data: { isDefault: true },
        });
      }
    }
  }

  async setDefaultAddress(userId: string, id: string) {
    const address = await this.prisma.address.findFirst({
      where: { id, userId },
    });

    if (!address) {
      throw new NotFoundException("Address not found");
    }

    await this.prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });

    return this.prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });
  }
}

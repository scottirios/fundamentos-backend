import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Prisma.OrderCreateInput): Promise<void> {
    await this.prisma.order.create({ data: order });
  }

  async findById(id: string): Promise<any> {
    return await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

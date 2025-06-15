import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<any> {
    return await this.prisma.product.findMany({
      include: {
        models: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<any> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        models: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findByName(
    name: string
  ): Promise<Prisma.ProductUncheckedCreateInput | null> {
    const product = this.prisma.product.findUnique({
      where: {
        name,
      },
    });

    return product;
  }

  async save(
    data: Prisma.ProductUncheckedCreateInput & { modelsIds?: string[] }
  ): Promise<any> {
    const { modelsIds, ...rest } = data;

    await this.prisma.product.update({
      where: {
        id: rest.id?.toString(),
      },
      data: {
        ...rest,
        models: modelsIds
          ? {
              set: [],
              connect: modelsIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  async create(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await this.prisma.product.create({
      data: product,
    });
  }

  async delete(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: product.id?.toString(),
      },
    });
  }
}

import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
import { PrismaService } from "prisma.service";

@Injectable()
export class ProductsRepository {
    constructor(private prisma: PrismaService) { }

    async create(product: Prisma.ProductUncheckedCreateInput): Promise<Prisma.ProductUncheckedCreateInput> {
        return await this.prisma.product.create({
            data: product,
        });
    }


    async findById(id: string): Promise<Product | null> {
        const product = this.prisma.product.findUnique({
            where: {
                id,
            }
        });

        return product;
    }

    async findMany(): Promise<Product[]> {
        const product = await this.prisma.product.findMany();
        return product;
    }

    
    async delete(id: string): Promise<void> {
        await this.prisma.product.delete({
            where: { id }
        });
    }

}

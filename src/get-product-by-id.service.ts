import { Category } from "@prisma/client";
import { ProductsRepository } from "./products.repository";
import { Injectable } from "@nestjs/common";

export interface Product {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    inStock: number;
    isAvailable: boolean;
    category: Category;
    tags: string[];
    createdAt: string | Date | undefined;
    updatedAt: string | Date | null | undefined;
}

type GetProductByIdServiceResponse = {
    product: Product | null;
}

@Injectable()
export class GetProductByIdService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async execute(id: string): Promise<GetProductByIdServiceResponse> {
        const product = await this.productsRepository.findById(id);
        return { product };
    }

}
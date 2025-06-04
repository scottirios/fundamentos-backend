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

type FetchRecentProductsServiceResponse = {
    products: Product[];
}

@Injectable()
export class FetchRecentProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async execute(): Promise<FetchRecentProductsServiceResponse> {
        const recentProducts = await this.productsRepository.findMany();
        return { products: recentProducts }
    }

}
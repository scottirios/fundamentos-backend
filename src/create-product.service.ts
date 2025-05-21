//SERVICE OR USECASE

import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Category } from "@prisma/client";

interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    inStock: number;
    isAvailable: boolean;
    category: Category;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface CreateProductServiceRequest {
    name: string;
    description?: string;
    price: number;
    inStock: number;
    isAvailable: boolean;
    category: Category;
    tags: string[];
}

type CreateProductServiceResponse = {
    product: Product;
}

@Injectable()
export class CreateProductService {
    constructor(private productRepository: ProductsRepository) { }

    async execute({
        name,
        description,
        price,
        inStock,
        isAvailable,
        category,
        tags

    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
        const productWithSameName = await this.productRepository.findByName(name);

        if (productWithSameName) {
            throw new Error("Product already exists");
        }

        const product = {
            name,
            description,
            price,
            inStock,
            isAvailable,
            category,
            tags
        }

        await this.productRepository.create(product);

        return new Promise(() => product);

    }
}
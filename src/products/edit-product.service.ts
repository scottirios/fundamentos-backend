import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@prisma/client";
import { ProductsRepository } from "./products.repository";

interface EditProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  id: string;
  modelsIds?: string[];
}

@Injectable()
export class EditProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
    inStock,
    isAvailable,
    category,
    tags,
    id,
    modelsIds,
  }: EditProductServiceRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    await this.productsRepository.save({
      ...product,
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      modelsIds,
    });
  }
}

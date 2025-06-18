import { BadRequestException, Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { ProductsRepository } from "./products.repository";
import { ModelsRepository } from "src/models/models.repository";

interface CreateProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  modelId: string;
}

@Injectable()
export class CreateProductService {
  constructor(
    private productsRepository: ProductsRepository,
    private modelsRepository: ModelsRepository
  ) {}

  async execute({
    name,
    description,
    price,
    inStock,
    isAvailable,
    category,
    tags,
    modelId,
  }: CreateProductServiceRequest): Promise<void> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new BadRequestException("Product with same name already exists.");
    }

    const model = await this.modelsRepository.findById(modelId);

    if (!model) {
      throw new BadRequestException(`Model ${modelId} does not exist.`);
    }

    await this.productsRepository.create({
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      models: { connect: { id: modelId } },
    });
  }
}

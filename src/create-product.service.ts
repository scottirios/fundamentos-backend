import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Category } from "@prisma/client";
import { ModelsRepository } from "./models.repository";

interface CreateProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  modelsIds?: string[];
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
    modelsIds,
  }: CreateProductServiceRequest): Promise<void> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new BadRequestException("Product with same name already exists.");
    }

    const modelsToConnect: { id: string }[] = [];

    if (modelsIds) {
      for (const modelId of modelsIds) {
        const model = await this.modelsRepository.findById(modelId);

        if (!model) {
          throw new BadRequestException(`Model ${modelId} does not exists.`);
        }

        modelsToConnect.push({ id: modelId });
      }
    }

    const product = {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      models: {
        connect: modelsToConnect,
      },
    };

    await this.productsRepository.create(product);
  }
}

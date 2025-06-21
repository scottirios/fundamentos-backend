/*import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "src/products/products.repository";
import { UserRepository } from "src/users/users.repository";

interface CreateOrderServiceRequest {
  userId: string;
  orderItems: string[];
  total: number;
}

@Injectable()
export class CreateProductService {
  constructor(
    private productsRepository: ProductsRepository,
    private usersRepository: UserRepository
  ) {}

  async execute({
    userId,
    orderItems,
    total,
  }: CreateOrderServiceRequest): Promise<void> {
    const productWithSameName = await this.productsRepository.findByName(name);

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
*/
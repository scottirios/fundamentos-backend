
import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class DeleteProductService {
    constructor(private readonly productsRepository: ProductsRepository) { }
    async execute(id: string): Promise<void> {
        await this.productsRepository.delete(id);
    }
}
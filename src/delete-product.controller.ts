import { Controller, Delete, Get, HttpCode, Param } from "@nestjs/common";
import { DeleteProductService } from "./delete-product.service";

@Controller("/products")
export class DeleteProductController {
    constructor(private readonly service: DeleteProductService) { }

    @Delete(":id")
    @HttpCode(200)
    async handle(@Param("id") id: string): Promise<void> {
        await this.service.execute(id);
    }

}
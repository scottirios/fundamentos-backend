import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetProductByIdService } from "./get-product-by-id.service";

@Controller('/products')
export class GetProductByIdController {
    constructor(private readonly service: GetProductByIdService) { }

    @Get(':id')
    @HttpCode(200)
    async handle(@Param('id') id: string) {
        const { product } = await this.service.execute(id);
        return `Produto localizado ${product?.name}`
    }
}

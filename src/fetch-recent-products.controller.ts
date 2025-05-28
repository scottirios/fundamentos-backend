import { Controller, Get, HttpCode, Param } from "@nestjs/common";

@Controller('/products')
export class GetProductsController {

    constructor() { }

    @Get(':id')
    @HttpCode(200)
    findById(@Param('id') id: string) {
        return `Produto localizado ${id}`
    }

    @Get()
    @HttpCode(200)
    findMany() {
        return 
    }

}
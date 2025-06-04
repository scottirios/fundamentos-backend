import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FetchRecentProductsService } from "./fetch-recent-products.service";

@Controller('/products')
export class FetchRecentProductsController {
    constructor(private readonly service: FetchRecentProductsService) { }

    @Get()
    @HttpCode(200)
    async handle() {
        const products = await this.service.execute();
        return products;
    }
}
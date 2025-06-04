
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FetchRecentModelsService } from "./fetch-recent-models.service";

@Controller("/models")
export class FetchRecentModelsController {
    constructor(private readonly service: FetchRecentModelsService) { }

    @Get()
    @HttpCode(200)
    async handle() {
        const models = await this.service.execute();
        return models;

    }

}
import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentModelsService } from "./fetch-recent-models.service";

@Controller("/models")
export class FetchRecentModelsController {
  constructor(private fetchRecentModels: FetchRecentModelsService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const models = await this.fetchRecentModels.execute();

    return {
      models,
    };
  }
}

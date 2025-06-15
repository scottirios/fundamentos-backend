import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetModelByIdService } from "./get-model-by-id.service";

@Controller("/models/:id")
export class GetModelByIdController {
  constructor(private getModelById: GetModelByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const model = await this.getModelById.execute({
      id,
    });

    return {
      model,
    };
  }
}

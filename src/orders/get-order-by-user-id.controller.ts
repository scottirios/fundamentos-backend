import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetOrderByUserIdService } from "./get-order-by-user-id.service";

@Controller("/users/:userId/orders")
export class GetOrderByUserIdController {
  constructor(private getOrderByUserIdService: GetOrderByUserIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    const { orders } = await this.getOrderByUserIdService.execute({
      userId,
    });

    return {
      orders,
    };
  }
}

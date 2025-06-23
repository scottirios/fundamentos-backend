import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateOrderService } from "./create-order.service";

const createOrderBodySchema = z.object({
  userId: z.string().uuid(),
  orderItems: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().min(1),
    })
  ),
});

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema);
type CreateOrderBody = z.infer<typeof createOrderBodySchema>;

@Controller("/orders")
export class CreateOrderController {
  constructor(private createOrderService: CreateOrderService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateOrderBody) {
    const { userId, orderItems } = body;

    const order = await this.createOrderService.execute({ userId, orderItems });

    return { order };
  }
}

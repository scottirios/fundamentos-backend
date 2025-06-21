/*import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from "zod";

const createOrderBodySchema = z.object({
  userId: z.string().uuid().min(1),
  orderItems: z.array(z.string().uuid()).min(1),
  total: z.number(),
});

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema);

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>;

@Controller("/orders")
export class CreateOrderController {
  constructor(private createOrder: CreateOrderService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateOrderBodySchema) {
    const { userId, orderItems, total } = body;

    await this.createOrder.execute({
      userId,
      orderItems,
      total,
    });
  }
}*/

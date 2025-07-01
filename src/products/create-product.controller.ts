import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateProductService } from "./create-product.service";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { Category } from "@prisma/client";

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  inStock: z.number(),
  isAvailable: z.boolean(),
  category: z.enum([
    Category.ELECTRONICS,
    Category.OTHER,
    Category.FASHION,
    Category.HOME,
  ]),
  tags: z.array(z.string()),
  modelId: z.string().uuid(),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller("/products")
export class CreateProductController {
  constructor(private createProduct: CreateProductService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
    const {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      modelId,
    } = body;

    await this.createProduct.execute({
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      modelId,
    });
  }
}

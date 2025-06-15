import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { Category } from "@prisma/client";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from "zod";
import { EditProductService } from "./edit-product.service";

const editProductBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  inStock: z.number(),
  isAvailable: z.boolean(),
  category: z.enum([Category.ELECTRONICS, Category.OTHER]),
  tags: z.array(z.string()),
  modelsIds: z.array(z.string()).optional(),
});

const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema);

type EditProductBodySchema = z.infer<typeof editProductBodySchema>;

@Controller("/products/:id")
export class EditProductController {
  constructor(private editProduct: EditProductService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProductBodySchema,
    @Param("id") id: string
  ) {
    const {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      modelsIds,
    } = body;

    await this.editProduct.execute({
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      id,
      modelsIds,
    });
  }
}

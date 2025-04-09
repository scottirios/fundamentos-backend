import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { z } from 'zod'; //
import { ZodValidationPipe } from './pipes/zod-validation-pipe'; //Formatar o erro

const createProductBodySchema = z.object({
  name: z.string().min(3).max(120),
  model: z.string().min(3).max(20),
  dateManufacture: z.string().date(),
  year: z.number().gt(4),
  brand: z.string().min(3).max(20),
  email: z.string().email(),
  cpf: z.string().regex(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class AppController {
  constructor() {}

  @Post()
  create(@Body(bodyValidationPipe) body: CreateProductBodySchema): string {
    return `Product create ${body.name}`;
  }
}

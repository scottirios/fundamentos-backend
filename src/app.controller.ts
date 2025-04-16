import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { z } from 'zod'; 
import { ZodValidationPipe } from './pipes/zod-validation-pipe'; //Formatar o erro
import { isValidCPF } from './utils/is-valid-cpf';

enum Status {
  APROVADO = 'APROVADO',
  NEGADO = 'NEGADO',
  PENDENTE = 'PENDENTE'
}

const updateStatusProductBodySchema = z.object({
  status: z.enum([Status.APROVADO, Status.NEGADO], {
    message: "Status must be 'APROVADO' or 'NEGADO'. "
  })
});

const updateStatusBodyValidationPipe = new ZodValidationPipe(updateStatusProductBodySchema);

type UpdateStatusProductBodySchema = z.infer<typeof updateStatusProductBodySchema>;

const updateProductBodySchema = z.object({
  name: z.string().min(3).max(120).optional(),
  model: z.string().min(3).max(20).optional(),
  dateManufacture: z.string().date().optional(),
  year: z.number().gt(4).optional(),
  brand: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  cpf: z.string().regex(/^\d{11}$/, {
    message: "CPF deve conter exatamente 11 digitos numéricos",
  })
    .refine(isValidCPF, {
      message: "CPF invalido."
    })
});

const updateBodyValidationPipe = new ZodValidationPipe(updateProductBodySchema);

type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;


@Controller('/products')
export class AppController {

  private products = [];

  constructor() { }

  @Get()
  @HttpCode(200)
  findAll() {
    return "Produtos";
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string) {
    return `Produto localizado ${id}`
  }


  @Put(':id')
  @HttpCode(204)
  update(
    @Param('id') id: string,
    @Body(updateBodyValidationPipe) body: UpdateProductBodySchema) {

  }


  @Patch(':id/status')
  @HttpCode(204)
  updateStatus(
    @Param('id') id: string,
    @Body(updateStatusBodyValidationPipe) body: UpdateStatusProductBodySchema) {

  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return `Produto removido ${id}`
  }

  @Get()
  getProducts() {
    return this.products;
  }

}


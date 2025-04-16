import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { z } from 'zod'; //
import { ZodValidationPipe } from './pipes/zod-validation-pipe'; //Formatar o erro

function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += +cpf.charAt(i) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== +cpf.charAt(9)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += +cpf.charAt(i) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === +cpf.charAt(10);
}

const createProductBodySchema = z.object({
  name: z.string().min(3).max(120),
  model: z.string().min(3).max(20),
  dateManufacture: z.string().date(),
  year: z.number().gt(4),
  brand: z.string().min(3).max(20),
  email: z.string().email(),
  cpf: z.string().regex(/^\d{11}$/, {
    message: "CPF deve conter exatamente 11 digitos numéricos",
  })
    .refine(isValidCPF, {
      message: "CPF invalido."
    })
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;


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

const updateStatusProductBodySchema = z.object({
  status: z.string().max(10)
});

const updateStatusBodyValidationPipe = new ZodValidationPipe(updateStatusProductBodySchema);

type UpdateStatusProductBodySchema = z.infer<typeof updateStatusProductBodySchema>;

@Controller('/products')
export class AppController {

  private products = [];

  constructor() { }


  @Post()
  @HttpCode(201)
  create(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
    const { brand, dateManufacture, cpf, email, model, name, year } = body;
    // Executar o service com a regra de negócio. (Gravar o produto no BD).
    return "Create";
  }

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


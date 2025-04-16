import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe'; //Formatar o erro
import { isValidCPF } from './utils/is-valid-cpf';

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

@Controller('/products')
export class CreateProductController {

    constructor() { }

    @Post()
    @HttpCode(201)
    async handle(@Body(bodyValidationPipe) body: CreateProductController) {

    }
}

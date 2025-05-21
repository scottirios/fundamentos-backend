import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe'; //Formatar o erro
import { CreateProductService } from './create-product.service';


const createProductBodySchema = z.object({
    name: z.string().min(3).max(120),
    description: z.string().min(3).max(120),
    price: z.number().gt(1),
    inStock: z.number().gt(0),
    isAvailable: z.boolean(),
    category: z.enum(["HOME", "MATERIAL", "ELECTRONIC", "OTHER"]),
    tags: z.array(z.string())
});


const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class CreateProductController {

    constructor(private createProduct: CreateProductService) { }

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
            tags
        } = body

        await this.createProduct.execute({
            name,
            description,
            price,
            inStock,
            isAvailable,
            category,
            tags
        });
    }
}

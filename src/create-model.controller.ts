import { z } from "zod";
import { ZodValidationPipe } from "./pipes/zod-validation-pipe";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateModelService } from "./create-model.service";

const createModelBodySchema = z.object({
    name: z.string()
})

const bodyValidationPipe = new ZodValidationPipe(createModelBodySchema);

type CreateModelBodySchema = z.infer<typeof createModelBodySchema>;

@Controller('/models')
export class CreatedModelController {

    constructor(private createModel: CreateModelService) { }

    @Post()
    @HttpCode(201)
    async handle(@Body(bodyValidationPipe) body: CreateModelBodySchema) {

        const {
            name
        } = body

        const model = await this.createModel.execute({
            name
        });

        return { model }

    }
}
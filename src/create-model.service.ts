import { Injectable } from "@nestjs/common";
import { ModelsRepository } from "./models.repository";

export interface Model {
    id: string,
    name: string,
    createdAt: string | Date | undefined;
    updatedAt: string | Date | null | undefined;
}

interface CreateModelServiceRequest {
    name: string;
}

type CreateModelServiceResponse = {
    model: Model;
}

@Injectable()
export class CreateModelService {

    constructor(private modelRepository: ModelsRepository) { }

    async execute({
        name
    }: CreateModelServiceRequest): Promise<CreateModelServiceResponse> {
        const modelWithSameName = await this.modelRepository.findByName(name);

        if (modelWithSameName) {
            throw new Error("Model already exists");
        }

        const model = {
            name
        }

        const newModel = await this.modelRepository.create(model);

        return {
            model: {
                id: newModel.id?.toString() || "",
                name,
                createdAt: newModel.createdAt,
                updatedAt: newModel.updatedAt
            }
        }
    }





}
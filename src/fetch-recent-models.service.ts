
import { ModelsRepository } from "./models.repository";
import { Injectable } from "@nestjs/common";

export interface Model {
    id: string;
    name: string;
    createdAt: string | Date | undefined
    updatedAt: string | Date | null | undefined;
}

type FetchRecentModelsServiceResponse = {
    models: Model[];
}

@Injectable()
export class FetchRecentModelsService {
    constructor(private readonly modelsRepository: ModelsRepository) { }
    async execute(): Promise<FetchRecentModelsServiceResponse> {
        const recentModels = await this.modelsRepository.findMany();
        return { models: recentModels }
    }

}
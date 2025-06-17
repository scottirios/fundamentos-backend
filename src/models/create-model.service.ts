import { BadRequestException, Injectable } from "@nestjs/common";
import { ModelsRepository } from "./models.repository";

interface CreateModelServiceRequest {
  name: string;
}

@Injectable()
export class CreateModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ name }: CreateModelServiceRequest): Promise<void> {
    const modelWithSameEmail = await this.modelsRepository.findByName(name);

    if (modelWithSameEmail) {
      throw new BadRequestException("Model with same name already exists.");
    }

    await this.modelsRepository.create({ name });
  }
}

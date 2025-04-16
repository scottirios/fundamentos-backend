//SERVICE OR USECASE

import { Injectable } from "@nestjs/common";

interface CreateProductServiceRequest {
    name: string,
    model: string,
    dateManufacture: string,
    year: string,
    brand: string,
    email: string,
    cpf: string
}

type CreateProductServiceResponse = {
    product: CreateProductService;
}

@Injectable()
export class CreateProductService {
    constructor() { }

    async execute({
        name,
        model,
        dateManufacture,
        year,
        brand,
        email,
        cpf

    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {

        return null;

    }
}
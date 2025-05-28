import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "prisma.service";

@Injectable()
export class ModelsRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Prisma.ModelUncheckedCreateInput | null> {
        const model = this.prisma.model.findUnique({
            where: {
                id,
            }
        })

        return model;
    }

    async findByName(name: string): Promise<Prisma.ModelUncheckedCreateInput | null> {
        const model = this.prisma.model.findUnique({
            where: {
                name,
            }
        });

        return model;
    }

    async create(model: Prisma.ModelUncheckedCreateInput): Promise<Prisma.ModelUncheckedCreateInput> {
        return await this.prisma.model.create({
            data: model,
        })
    }
}
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<any> {
    return await this.prisma.profile.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.create({
      data,
    });
  }
}

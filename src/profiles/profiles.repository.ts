import { Injectable } from "@nestjs/common";
import { Prisma, Profile } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<any> {
    return await this.prisma.profile.findUnique({
      where: {
        id,
      },
      include: { user: true },
    });
  }

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async delete(profile: Profile): Promise<void> {
    await this.prisma.profile.delete({
      where: {
        id: profile.id?.toString(),
      },
    });
  }
}

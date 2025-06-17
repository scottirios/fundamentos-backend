import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: Prisma.UserUncheckedCreateInput): Promise<void> {
    await this.prisma.user.create({
      data: user,
    });
  }

  async findByEmail(
    email: string
  ): Promise<Prisma.UserUncheckedCreateInput | null> {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<Prisma.UserUncheckedCreateInput | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyRecent(): Promise<Prisma.UserUncheckedCreateInput[] | null> {
    return await this.prisma.user.findMany();
  }
}

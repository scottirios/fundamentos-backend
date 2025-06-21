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

  async findById(id: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: {
          select: {
            id: true,
            avatarUrl: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async findManyRecent(): Promise<Prisma.UserUncheckedCreateInput[] | null> {
    return await this.prisma.user.findMany();
  }

  async save(data: { id: string; email: string }): Promise<void> {
    await this.prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        updatedAt: new Date(),
      },
    });
  }
}

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { Profile } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
  profile: Profile | null;
}

interface GetUserByIdServiceRequest {
  id: string;
}

type GetUserByIdServiceResponse = {
  user: User;
};

@Injectable()
export class GetUserByIdService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    id,
  }: GetUserByIdServiceRequest): Promise<GetUserByIdServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    const newUser: User = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile
        ? {
            id: user.profile.id,
            avatarUrl: user.profile.avatarUrl,
            userId: user.profile.userId,
            createdAt: user.profile.createdAt,
            updatedAt: user.profile.updatedAt,
          }
        : null,
    };

    return {
      user: newUser,
    };
  }
}

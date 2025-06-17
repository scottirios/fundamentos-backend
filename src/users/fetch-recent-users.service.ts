import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";

export interface User {
  id: string;
  email: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

type FetchRecentUsersServiceResponse = {
  users: User[];
};

@Injectable()
export class FetchRecentUsersService {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<FetchRecentUsersServiceResponse> {
    const users = await this.usersRepository.findManyRecent();

    const newUsers: User[] = [];

    if (!users) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    for (const user of users) {
      newUsers.push({
        id: user.id?.toString() || "",
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }

    return {
      users: newUsers,
    };
  }
}

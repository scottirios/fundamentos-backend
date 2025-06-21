import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./users.repository";

interface EditUserServiceRequest {
  id: string;
  email: string;
}

@Injectable()
export class EditUserService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ id, email }: EditUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.usersRepository.save({
      id,
      email,
    });
  }
}

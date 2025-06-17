import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";

interface CreateUserServiceRequest {
  email: string;
}

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email }: CreateUserServiceRequest): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new BadRequestException("User with this email already exists.");
    }

    await this.usersRepository.create({ email });
  }
}

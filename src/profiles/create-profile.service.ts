import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProfileRepository } from "./profiles.repository";
import { UserRepository } from "src/users/users.repository";

interface CreateProfileServiceRequest {
  userId: string;
  avatarUrl?: string;
}

@Injectable()
export class CreateProfileService {
  constructor(
    private profilesRepository: ProfileRepository,
    private usersRepository: UserRepository
) {}

  async execute({
    userId,
    avatarUrl,
  }: CreateProfileServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    if (user.profile) {
        throw new BadRequestException("User already has a profile.");
    }

    await this.profilesRepository.create({
        userId,
        avatarUrl,
    });
  }
}

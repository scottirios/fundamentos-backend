import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { ProfileRepository } from "./profiles.repository";

export interface Profile {
  id: string;
  avatarUrl: string | null;
  userId: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
  user: User;
}

interface GetProfileByIdServiceRequest {
  id: string;
}

type GetProfileByIdServiceResponse = {
  profile: Profile;
};

@Injectable()
export class GetProfileByIdService {
  constructor(private profilesRepository: ProfileRepository) {}

  async execute({
    id,
  }: GetProfileByIdServiceRequest): Promise<GetProfileByIdServiceResponse> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new HttpException("Profile not found.", HttpStatus.NOT_FOUND);
    }

    const newProfile: Profile = {
      id: profile.id?.toString() || "",
      avatarUrl: profile.avatarUrl,
      userId: profile.userId,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      user: profile.user,
    };

    return {
      profile: newProfile,
    };
  }
}

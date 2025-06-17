import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentUsersService } from "./fetch-recent-users.service";

@Controller("/users")
export class FetchRecentUsersController {
  constructor(private fetchRecentUsers: FetchRecentUsersService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const users = await this.fetchRecentUsers.execute();

    return {
      users,
    };
  }
}

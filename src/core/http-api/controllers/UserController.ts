import { GetUserUseCase } from "../../application/use-cases/user/GetUserUseCase";
import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { CreateUserRequestDto } from "../../application/DTOs/request/CreateUserRequestDto";
import { UserResponseDto } from "../../application/DTOs/response/UserResponseDto";

// HTTP API Controller
export class UserController {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private createUserUseCase: CreateUserUseCase
  ) {}

  async getUser(userId: string): Promise<UserResponseDto | null> {
    try {
      return await this.getUserUseCase.execute(userId);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async createUser(request: CreateUserRequestDto): Promise<UserResponseDto> {
    try {
      return await this.createUserUseCase.execute(request);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

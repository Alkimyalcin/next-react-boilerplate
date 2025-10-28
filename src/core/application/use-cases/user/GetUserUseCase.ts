import { IUserRepository } from "../../interfaces/IUserRepository";
import { UserResponseDto } from "../../DTOs/response/UserResponseDto";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return null;
    }

    // Entity'den DTO'ya dönüşüm
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}

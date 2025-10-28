import { IUserRepository } from "../../interfaces/IUserRepository";
import { User } from "../../../domain/entities/User";
import { CreateUserRequestDto } from "../../DTOs/request/CreateUserRequestDto";
import { UserResponseDto } from "../../DTOs/response/UserResponseDto";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(request: CreateUserRequestDto): Promise<UserResponseDto> {
    // DTO'dan Entity'ye dönüşüm
    const user = new User(
      Date.now().toString(),
      request.name,
      request.email,
      new Date(),
      new Date()
    );

    // Repository ile kaydet
    const savedUser = await this.userRepository.create(user);

    // Entity'den DTO'ya dönüşüm
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt.toISOString(),
      updatedAt: savedUser.updatedAt.toISOString(),
    };
  }
}

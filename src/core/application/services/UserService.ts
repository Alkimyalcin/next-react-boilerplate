import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { GetUserUseCase } from "../use-cases/user/GetUserUseCase";
import { CreateUserUseCase } from "../use-cases/user/CreateUserUseCase";
import { UserController } from "../../http-api/controllers/UserController";

// Service Factory - Dependency Injection
export class UserService {
  private static instance: UserService;
  private userController: UserController;

  private constructor() {
    // Repository oluştur
    const userRepository = new UserRepository();

    // Use case'leri oluştur
    const getUserUseCase = new GetUserUseCase(userRepository);
    const createUserUseCase = new CreateUserUseCase(userRepository);

    // Controller oluştur
    this.userController = new UserController(getUserUseCase, createUserUseCase);
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getUserController(): UserController {
    return this.userController;
  }
}

// Kullanım örneği:
// const userService = UserService.getInstance();
// const controller = userService.getUserController();
// const user = await controller.getUser('user-id');
// const newUser = await controller.createUser({ name: 'John', email: 'john@example.com', password: '123456' });

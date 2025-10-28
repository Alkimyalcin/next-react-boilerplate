import { NextResponse } from "next/server";
import { UserService } from "@/core/application/services/UserService";

export async function GET() {
  try {
    const userService = UserService.getInstance();
    const controller =
      userService.getUserController()["getUserUseCase"]["userRepository"];
    const users = await controller.findAll();

    return NextResponse.json({
      success: true,
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed to fetch users ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userService = UserService.getInstance();
    const controller = userService.getUserController();

    const newUser = await controller.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed to create user ${error}` },
      { status: 500 }
    );
  }
}

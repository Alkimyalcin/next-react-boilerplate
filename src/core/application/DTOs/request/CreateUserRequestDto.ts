// Request DTO - Hem Next.js hem de Backend'de kullanılabilir
export interface CreateUserRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequestDto {
  name?: string;
  email?: string;
}

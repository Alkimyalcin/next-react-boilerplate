// Response DTO - Hem Next.js hem de Backend'de kullanılabilir
export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersListResponseDto {
  users: UserResponseDto[];
  total: number;
  page: number;
  pageSize: number;
}

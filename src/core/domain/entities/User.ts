// Domain Entity
export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  // Domain logic metodları buraya eklenebilir
  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  getDisplayName(): string {
    return this.name || this.email.split("@")[0];
  }
}

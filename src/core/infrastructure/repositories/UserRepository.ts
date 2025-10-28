import { IUserRepository } from "../../application/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";
import { DatabaseService } from "../database/DatabaseService";

interface UserRow {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export class UserRepository implements IUserRepository {
  private db = DatabaseService.getInstance().getDatabase();

  async findById(id: string): Promise<User | null> {
    const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
    const row = stmt.get(id) as UserRow | undefined;

    if (!row) return null;

    return new User(
      row.id,
      row.name,
      row.email,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<User[]> {
    const stmt = this.db.prepare(
      "SELECT * FROM users ORDER BY created_at DESC"
    );
    const rows = stmt.all() as UserRow[];

    return rows.map(
      (row) =>
        new User(
          row.id,
          row.name,
          row.email,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    );
  }

  async create(user: User): Promise<User> {
    const stmt = this.db.prepare(`
      INSERT INTO users (id, name, email, password, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      user.id,
      user.name,
      user.email,
      "hashed_password", // Gerçek uygulamada hash'lenmeli
      user.createdAt.toISOString(),
      user.updatedAt.toISOString()
    );

    return user;
  }

  async update(user: User): Promise<User> {
    const stmt = this.db.prepare(`
      UPDATE users 
      SET name = ?, email = ?, updated_at = ?
      WHERE id = ?
    `);

    stmt.run(user.name, user.email, new Date().toISOString(), user.id);

    return user;
  }

  async delete(id: string): Promise<void> {
    const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
    stmt.run(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?");
    const row = stmt.get(email) as UserRow | undefined;

    if (!row) return null;

    return new User(
      row.id,
      row.name,
      row.email,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }
}

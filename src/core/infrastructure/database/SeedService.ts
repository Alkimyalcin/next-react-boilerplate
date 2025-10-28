import { DatabaseService } from "./DatabaseService";

export class SeedService {
  private db = DatabaseService.getInstance().getDatabase();

  seedUsers(): void {
    const users = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "hashed_password_1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "hashed_password_2",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        password: "hashed_password_3",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const stmt = this.db.prepare(`
      INSERT OR IGNORE INTO users (id, name, email, password, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    users.forEach((user) => {
      stmt.run(
        user.id,
        user.name,
        user.email,
        user.password,
        user.created_at,
        user.updated_at
      );
    });

    console.log("✅ Seed data inserted successfully");
  }

  clearAllData(): void {
    this.db.exec("DELETE FROM users");
    console.log("🗑️  All data cleared");
  }
}

import Database from "better-sqlite3";
import path from "path";

export class DatabaseService {
  private static instance: DatabaseService;
  private db: Database.Database;

  private constructor() {
    const dbPath =
      process.env.DATABASE_PATH || path.join(process.cwd(), "data", "app.db");
    this.db = new Database(dbPath);
    this.db.pragma("journal_mode = WAL");
    this.initialize();
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  getDatabase(): Database.Database {
    return this.db;
  }

  private initialize(): void {
    this.createTables();
  }

  private createTables(): void {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `;

    this.db.exec(createUsersTable);
  }

  close(): void {
    this.db.close();
  }
}

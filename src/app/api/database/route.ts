import { NextResponse } from "next/server";
import { DatabaseService } from "@/core/infrastructure/database/DatabaseService";
import { SeedService } from "@/core/infrastructure/database/SeedService";

type SqliteTable = {
  name: string;
};

export async function GET() {
  try {
    const db = DatabaseService.getInstance().getDatabase();

    // Tüm tabloları al
    const tables = db
      .prepare(
        `
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      ORDER BY name
    `
      )
      .all() as SqliteTable[];

    // Her tablo için satır sayısını al
    const tableStats = tables.map((table: SqliteTable) => {
      const count = db
        .prepare(`SELECT COUNT(*) as count FROM ${table.name}`)
        .get() as { count: number };
      return {
        name: table.name,
        rowCount: count.count,
      };
    });

    return NextResponse.json({
      success: true,
      tables: tableStats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Database query failed ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    const seedService = new SeedService();

    if (action === "seed") {
      seedService.seedUsers();
      return NextResponse.json({
        success: true,
        message: "Data seeded successfully",
      });
    }

    if (action === "clear") {
      seedService.clearAllData();
      return NextResponse.json({
        success: true,
        message: "Data cleared successfully",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Operation failed ${error}` },
      { status: 500 }
    );
  }
}

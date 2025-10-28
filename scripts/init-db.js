import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// __dirname eşleniğini oluştur
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "..", "data");

// data klasörünü oluştur
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log("✅ Data directory created");
} else {
  console.log("ℹ️ Data directory already exists");
}

// .gitkeep dosyası oluştur
const gitkeepPath = path.join(dataDir, ".gitkeep");
if (!fs.existsSync(gitkeepPath)) {
  fs.writeFileSync(gitkeepPath, "");
  console.log("✅ .gitkeep created");
}

console.log("🎉 Database initialization complete");

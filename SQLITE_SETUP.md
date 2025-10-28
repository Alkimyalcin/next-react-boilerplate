# SQLite Database Setup Guide

## 📦 Kurulum Adımları

### 1. Paketleri Yükle

```bash
npm install
```

Bu komut otomatik olarak şunları yapacak:

- Tüm bağımlılıkları yükler
- `better-sqlite3` native modülünü derler
- `data/` klasörünü oluşturur

### 2. Database'i Başlat

```bash
npm run init:db
```

Bu komut:

- `data/` klasörünü oluşturur
- Database'i initialize eder
- Tabloları oluşturur

### 3. Uygulamayı Çalıştır

```bash
# Web development
npm run dev

# Electron development
npm run electron:dev
```

## 🗄️ Database Yapısı

### Users Tablosu

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
)
```

## 🎯 Kullanım

### 1. Database Monitoring

Tarayıcıda veya Electron uygulamasında:

```
http://localhost:3000/database
```

Bu sayfada:

- ✅ Tablo istatistiklerini görüntüle
- ✅ Sample data ekle (Seed)
- ✅ Tüm verileri temizle
- ✅ Users tablosunu görüntüle

### 2. API Endpoints

#### Tüm Kullanıcıları Getir

```bash
GET /api/users
```

#### Yeni Kullanıcı Oluştur

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Database İstatistikleri

```bash
GET /api/database
```

#### Seed Data

```bash
POST /api/database
Content-Type: application/json

{
  "action": "seed"
}
```

#### Clear Data

```bash
POST /api/database
Content-Type: application/json

{
  "action": "clear"
}
```

### 3. Clean Architecture Kullanımı

```typescript
// UserService ile çalışma
import { UserService } from "@/core/application/services/UserService";

const userService = UserService.getInstance();
const controller = userService.getUserController();

// Yeni kullanıcı oluştur
const newUser = await controller.createUser({
  name: "Jane Doe",
  email: "jane@example.com",
  password: "securepass",
});

// Kullanıcı getir
const user = await controller.getUser("user-id");
```

## 🧪 Test Etme

### Home Sayfasından Test

1. Ana sayfaya git: `http://localhost:3000`
2. "Test Login" butonuna tıkla → Auth sistemini test et
3. "Create Test User" butonuna tıkla → Database'e yeni user ekle
4. "View Database" butonuna tıkla → Monitoring sayfasına git

### Database Monitoring Sayfasından

1. `/database` sayfasına git
2. "Seed Sample Data" → 3 örnek kullanıcı ekle
3. Users tablosunda verileri görüntüle
4. "Clear All Data" → Tüm verileri temizle

## 📁 Database Dosyası

SQLite database dosyası:

```
data/app.db
```

**Not:** Bu dosya `.gitignore` ile ignore edilir, production'da bulunmaz.

## 🔧 Sorun Giderme

### better-sqlite3 Build Hatası

Eğer `better-sqlite3` build edilemezse:

```bash
# Node.js yeniden build
npm rebuild better-sqlite3

# Veya temiz kurulum
rm -rf node_modules package-lock.json
npm install
```

### Electron'da Database Hatası

Electron production build'de path sorunları olabilir:

```typescript
// DatabaseService.ts'de path düzeltme
const dbPath = app.getPath("userData") + "/app.db";
```

## 🎨 Mimari Bilgisi

### Katmanlar

```
Domain Layer (Entities, Interfaces)
    ↓
Application Layer (Use Cases, DTOs, Services)
    ↓
Infrastructure Layer (Repository Implementation, Database)
    ↓
HTTP API Layer (Controllers, Routes)
    ↓
Presentation Layer (React Components, Pages)
```

### Database Flow

```
Page/Component
    ↓
API Route (/api/users)
    ↓
UserController
    ↓
CreateUserUseCase / GetUserUseCase
    ↓
UserRepository (SQLite Implementation)
    ↓
DatabaseService (better-sqlite3)
    ↓
SQLite Database (data/app.db)
```

## 🚀 Production Build

```bash
# Desktop build
npm run build:desktop

# Database dosyası production'da:
# Windows: %APPDATA%/MyDesktopApp/app.db
# macOS: ~/Library/Application Support/MyDesktopApp/app.db
# Linux: ~/.config/MyDesktopApp/app.db
```
